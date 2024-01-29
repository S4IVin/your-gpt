import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { OpenAI } from 'openai';
import { useSettingsStore } from './SettingsStore';

// eslint-disable-next-line import/prefer-default-export
export const useAppStore = defineStore('app', () => {
  const settings = useSettingsStore();

  const state = ref({
    isSettingsOpen: false,
    isDragOver: false,
    isError: false,
    text: '',
    images: [],
    messages: [
      {
        role: 'system',
        content: [{ type: 'text', text: settings.systemPrompt }]
      }
    ]
  });

  const properties = computed(() => ({
    isImagePreviewOpen: state.value.images.length > 0,
    isVisionEnabled: settings.gptModel === 'gpt-4-vision-preview'
  }));

  const extractEdges = (array, limit) => {
    return limit >= array.length || !limit ? array : [array[0], ...array.slice(-limit)];
  };

  const addImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => state.value.images.push(reader.result);
    reader.onerror = (error) => {
      throw error;
    };
  };

  const clearImage = (index) => {
    if (index !== undefined) {
      state.value.images.splice(index, 1);
    } else {
      state.value.images = [];
    }
  };

  const clearInput = () => {
    clearImage();
    state.value.text = '';
  };

  const clearChat = () => {
    state.value.messages = [
      {
        role: 'system',
        content: [{ type: 'text', text: settings.systemPrompt }]
      }
    ];
    clearInput();
  };

  const addMessage = (role, content, isError) => {
    state.value.messages.push({
      role,
      content,
      isError
    });
  };

  const addChunk = (chunk) => {
    state.value.messages[state.value.messages.length - 1].content += chunk;
  };

  const sortContents = (contents) => {
    return contents.sort((a, b) => {
      if (a.type === 'image_url') {
        return -1;
      }
      if (b.type === 'image_url') {
        return 1;
      }
      return 0;
    });
  };

  const mapMessageContent = (messageContent, rawMessage) => {
    if (messageContent.type === 'text') {
      return {
        type: messageContent.type,
        role: rawMessage.role,
        data: messageContent.text
      };
    }
    return {
      type: messageContent.type,
      role: rawMessage.role,
      data: messageContent.image_url
    };
  };

  const toggleSettings = () => {
    state.value.isSettingsOpen = !state.value.isSettingsOpen;
  };

  const getMessages = () => {
    return state.value.messages.slice(1).flatMap((rawMessage) => {
      if (Array.isArray(rawMessage.content)) {
        const sortedContent = sortContents(rawMessage.content);
        return sortedContent.map((messageContent) => mapMessageContent(messageContent, rawMessage));
      }
      return { type: 'text', role: rawMessage.role, data: rawMessage.content, isError: rawMessage.isError };
    });
  };

  const getTrunkatedMessages = () => {
    return extractEdges(state.value.messages, settings.messagesLimit);
  };

  const generateReply = async () => {
    try {
      const openai = new OpenAI({
        apiKey: settings.apiKey,
        dangerouslyAllowBrowser: true
      });

      state.value.messages[0] = {
        role: 'system',
        content: [{ type: 'text', text: settings.systemPrompt }]
      };

      const stream = await openai.chat.completions.create({
        model: settings.gptModel,
        messages: getTrunkatedMessages(),
        max_tokens: settings.tokensLimit === 0 ? 4096 : settings.tokensLimit,
        stream: true,
        temperature: settings.temperature,
        presence_penalty: settings.presencePenalty,
        frequency_penalty: settings.frequencyPenalty
      });

      state.value.isError = false;
      addMessage('assistant', '');

      for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) {
          addChunk(chunk.choices[0].delta.content);
        }
      }
    } catch (error) {
      state.value.isError = true;
      addMessage('assistant', error.message, true);
    }
  };

  const reloadConversation = async (isError) => {
    if (isError) {
      state.value.messages.splice(-1);
    }

    await generateReply();
  };

  const createConversation = async () => {
    const contents = state.value.text ? [{ type: 'text', text: state.value.text }] : [];
    contents.push(
      ...state.value.images.map((image) => ({
        type: 'image_url',
        image_url: image
      }))
    );

    if (contents.length) {
      addMessage('user', contents);
      await generateReply();
    }
  };

  return {
    state,
    properties,
    addImage,
    clearImage,
    clearInput,
    clearChat,
    toggleSettings,
    getMessages,
    reloadConversation,
    createConversation
  };
});
