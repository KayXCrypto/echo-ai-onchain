'use client';

import { useChat } from '@ai-sdk/react';
import { CopyIcon, MessageSquare } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Action, Actions } from '@/components/ai-elements/actions';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';

const models = [
  {
    name: 'GPT 4o',
    value: 'gpt-4o',
  },
  {
    name: 'Claude Sonnet 4',
    value: 'claude-sonnet-4-20250514',
  },
];

const suggestions = [
  'What\'s the weather like near Sagittarius A* today?',
  'Are there any solar storms forecasted in the Kuiper Belt?',
  'Will it be safe to travel through the Oort cloud this week?',
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[1].value);
  const { messages, sendMessage, status, error } = useChat();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setShowWelcome(false);
      sendMessage(
        { text: input },
        {
          body: {
            model: model,
          },
        }
      );
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setShowWelcome(false);
    sendMessage(
      { text: suggestion },
      {
        body: {
          model: model,
        },
      }
    );
  };

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col p-6">
      <div className="flex h-full min-h-0 flex-col">
        <Conversation className="relative min-h-0 w-full flex-1 overflow-hidden">
          <ConversationContent>
            {messages.length === 0 && showWelcome ? (
              <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <MessageSquare className="size-16 text-gray-400" />
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Interstellar Weather Bureau
                  </h2>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                      300-year career. 400 billion star systems. Covering the entirety of the galaxy.
                    </p>
                    <p>
                      And somehow, still stuck on the graveyard shift.
                    </p>
                    <p>
                      Your Insterstellar weatherman has seen it all—from the scorching surface of Sol to the frozen wastes of Vostok Station,
                      from geomagnetic storms around Earth to the crushing depths of Jupiter's atmosphere.
                      Planets, moons, stars, black holes, nebulae, asteroid fields—if it exists in this galaxy,
                      he's forecast its weather.
                    </p>
                    <p>
                      Ask him about weather conditions anywhere in the cosmos. He'll give you the forecast,
                      the survival tips you probably should've thought of yourself, and just the right amount of
                      tired sarcasm that comes with three centuries of dealing with tourists who think
                      visiting a supernova "sounds fun."
                    </p>
                    <p className="text-xs italic text-gray-500 dark:text-gray-500 pt-2">
                      Pro tip: He's never refused a location. Logic be damned.
                    </p>
                  </div>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="Interstellar Weather Bureau"
                description="Start a conversation to get your forecast"
              />
            ) : (
              messages.map(message => (
                <div key={message.id}>
                  {message.role === 'assistant' &&
                    message.parts.filter(part => part.type === 'source-url')
                      .length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              part => part.type === 'source-url'
                            ).length
                          }
                        />
                        {message.parts
                          .filter(part => part.type === 'source-url')
                          .map((part, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                              />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              </MessageContent>
                            </Message>
                            {message.role === 'assistant' &&
                              i === messages.length - 1 && (
                                <Actions className="mt-2">
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                          </Fragment>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={
                              status === 'streaming' &&
                              i === message.parts.length - 1 &&
                              message.id === messages.at(-1)?.id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))
            )}
            {status === 'submitted' && <Loader />}
            {error && (
              <div className="rounded-lg border border-red-500 bg-red-50 p-4 text-red-900 dark:bg-red-900/10 dark:text-red-400">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error.message || 'An error occurred while processing your request.'}</p>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <Suggestions>
          {suggestions.map(suggestion => (
            <Suggestion
              key={suggestion}
              onClick={handleSuggestionClick}
              suggestion={suggestion}
            />
          ))}
        </Suggestions>

        <PromptInput onSubmit={handleSubmit} className="mt-4 flex-shrink-0">
          <PromptInputTextarea
            onChange={e => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputModelSelect
                onValueChange={value => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map(model => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
