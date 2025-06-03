import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import axios from '../utils/axios';
import BottomNav from '../components/BottomNav';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Replace with your AI endpoint
      const response = await axios.post('/mobile/chat-bot', {
        text: userMessage.text
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.message,
        isUser: false,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library Assistant</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Send a message to start chatting!</Text>
            <Text style={styles.suggestionText}>Try asking:</Text>
            <Text style={styles.suggestion}>• Recommend me a book</Text>
            <Text style={styles.suggestion}>• Search for books by author</Text>
            <Text style={styles.suggestion}>• Help me find study materials</Text>
            <Text style={styles.suggestionRed}>• Please remeber this chat is temporary</Text>
            <Text style={styles.suggestionRed}>(Like the developer's female friends)</Text>
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#A79FC9"
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <BottomNav navigation={navigation} activeScreen="Chat" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D4FE8',
  },
  header: {
    padding: 15,
    backgroundColor: '#4F43C2',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#7A6FF0',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#4F43C2',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#4F43C2',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#5D4FE8',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  suggestionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestion: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
  suggestionRed: {
    color: '#ff6b6b',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ChatScreen;