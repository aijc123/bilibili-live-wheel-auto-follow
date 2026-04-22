export const MILK_GREEN_IMESSAGE_CSS = `/* 奶绿 iMessage by Chatterbox */
#laplace-custom-chat {
  --lc-chat-bg: #eef7f1;
  --lc-chat-panel: rgba(248, 253, 249, .82);
  --lc-chat-border: rgba(63, 103, 79, .15);
  --lc-chat-text: #1e3427;
  --lc-chat-muted: #6d8273;
  --lc-chat-name: #248a61;
  --lc-chat-bubble: #f7fff9;
  --lc-chat-bubble-text: #213d2b;
  --lc-chat-own: #2f9b70;
  --lc-chat-own-text: #fff;
  --lc-chat-chip: rgba(78, 141, 104, .14);
  --lc-chat-chip-text: #21422f;
  --lc-chat-accent: #34c759;
  --lc-chat-shadow: rgba(36, 74, 48, .16);
}

#laplace-custom-chat .lc-chat-list {
  background-image:
    linear-gradient(45deg, rgba(255,255,255,.45) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,.45) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,.45) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.45) 75%);
  background-size: 18px 18px;
  background-position: 0 0, 0 9px, 9px -9px, -9px 0;
}

#laplace-custom-chat .lc-chat-bubble {
  font-weight: 650;
  filter: drop-shadow(0 0 1px rgba(33, 61, 43, .24));
}

#laplace-custom-chat .lc-chat-name {
  color: #21976a;
}

#laplace-custom-chat .lc-chat-medal {
  background: rgba(248, 236, 160, .92);
  color: #4b3b08;
}

#laplace-custom-chat .lc-chat-card-event[data-card="gift"] .lc-chat-bubble {
  background: #ffdcc7;
  color: #4a2618;
}

#laplace-custom-chat .lc-chat-card-event[data-card="superchat"] .lc-chat-bubble {
  background: linear-gradient(135deg, #2f80ed, #47d18c);
  color: #fff;
}

#laplace-custom-chat .lc-chat-card-event[data-card="guard"] .lc-chat-bubble {
  background: linear-gradient(135deg, #d9f3e5, #bde5d1);
  color: #173b28;
}
`
