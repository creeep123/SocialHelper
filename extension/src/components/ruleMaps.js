const twitterRuleNames = {
  isExploreHidden: 'Explore',
  isTrendsHidden: 'Trends',
  isFollowingNumberHidden: 'Follow Number',
  isFollowerNumberHidden: 'Follower Number',
  isReactionNumberHidden: 'Reaction Number',
  isReactionNumberAlwaysHidden: 'Reaction Number Always',
  isReactionNumberDetailHidden: 'Reaction Number Detail',
  isWhoToFollowHidden: 'Who to Follow',
  isTopicsToFollowHidden: 'Topics to Follow',
  isRecommendationBlocked: 'Block Recommendation',
  isReplyButtonHidden: 'Reply Button',
  isLikeButtonHidden: 'Like Button',
  isShareButtonHidden: 'Share Button',
  isRetweetButtonHidden: 'Retweet Button',
  isHeadPortraitHidden: 'Head Portrait',
  isAccountIDHidden: 'Account ID',
};

const facebookRuleNames = {
  isAdsBlocked: 'Block Ads',
  isCreateRoomHidden: 'Hidden Creat Room panel',
  isCreateStoryHidden: 'Hidden Create Story panel',
  isSuggestionBlocked: 'Block Suggentions',
  isLikeHidden: 'Like Button',
  isShareHidden: 'Share Button',
  isCommentHidden: 'Comment Button',
  isReactionHidden: 'Reaction',
};

const defaultConfig = {
  twitter: {
    hide: {
      isExploreHidden: false,
      isTrendsHidden: false,
      isReactionNumberHidden: false,
      isFollowingNumberHidden: false,
      isFollowerNumberHidden: false,
      isReactionNumberAlwaysHidden: false,
      isReactionNumberDetailHidden: false,
      isWhoToFollowHidden: false,
      isTopicsToFollowHidden: false,
      isRecommendationBlocked: false,
      isReplyButtonHidden: false,
      isLikeButtonHidden: false,
      isShareButtonHidden: false,
      isRetweetButtonHidden: false,
      isHeadPortraitHidden: false,
      isAccountIDHidden: false,
    },
    // change: [
    //   { type: 'user_name', origin: '@biconomy', replacement: 'David' },
    //   {
    //     type: 'content',
    //     origin: 'biconomy/status/1521490742375591937',
    //     replacement: 'Some New Content?',
    //   },
    // ],
    change: [],
    version: '',
  },
  facebook: {
    hide: {
      isAdsBlocked: false,
      isCreateRoomHidden: false,
      isCreateStoryHidden: false,
      isSuggestionBlocked: false,
      isLikeHidden: false,
      isShareHidden: false,
      isCommentHidden: false,
      isReactionHidden: false,
    },
    // change: [
    //   { type: 'user_name', origin: '@biconomy', replacement: 'David' },
    //   {
    //     type: 'content',
    //     origin: 'biconomy/status/1521490742375591937',
    //     replacement: 'Some New Content?',
    //   },
    // ],
    change: [],
    version: '',
  },
};

const defaultAllConfig = [
  {
    hide: {
      isAdsBlocked: false,
      isCreateRoomHidden: false,
      isCreateStoryHidden: false,
      isSuggestionBlocked: false,
      isLikeHidden: false,
      isShareHidden: false,
      isCommentHidden: false,
      isReactionHidden: false,
    },
    change: [],
    version: '',
  },
  {
    hide: {
      isExploreHidden: false,
      isTrendsHidden: false,
      isReactionNumberHidden: false,
      isFollowingNumberHidden: false,
      isFollowerNumberHidden: false,
      isReactionNumberAlwaysHidden: false,
      isReactionNumberDetailHidden: false,
      isWhoToFollowHidden: false,
      isTopicsToFollowHidden: false,
      isRecommendationBlocked: false,
      isReplyButtonHidden: false,
      isLikeButtonHidden: false,
      isShareButtonHidden: false,
      isRetweetButtonHidden: false,
      isHeadPortraitHidden: false,
      isAccountIDHidden: false,
    },
    change: [],
    version: '',
  },
];

const placeholders = {
  card: [
    'resource url',
    'title',
    'abstract',
    'content',
    'summarized information',
  ],
  image: 'url1,\nurl2,\nurl3......',
  user_name: '@new_user_name',
  content: 'new content',
  video: 'video url',
  com_sum: [
    'True percentage (0~100)',
    'Fake percentage (0~100)',
    'Display type (percentage or count)',
  ],
  inserted_card: [
    'show avatar? (true or false)',
    'avatar url',
    'user name',
    'user name url(when click on user name)',
    'show time? (true or false)',
    'time',
    'content',
    'resource url (when click on image)',
    'resource img url',
    'info summary',
    'resource website',
    'abstract',
    'like number',
    'comment number',
    'share number',
  ],
};

//const keyNames = Object.keys(defaultConfig.hide);

export {
  twitterRuleNames,
  facebookRuleNames,
  defaultConfig,
  defaultAllConfig,
  placeholders,
};
