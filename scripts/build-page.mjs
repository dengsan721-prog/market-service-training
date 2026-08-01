import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const outputFile = path.join(repoRoot, 'index.html');
const assetsDir = path.join(repoRoot, 'assets');

const assetFiles = [
  {
    key: 'logo',
    title: '幸福驿站logo',
    source: 'G:/幸福驿站logo/微信图片_20250211160633.png',
    file: 'logo.png'
  },
  {
    key: 'service123456',
    title: '驿站主市场服务123456（3.0）',
    source: 'C:/Users/Administrator/AppData/Local/Temp/codex-clipboard-713728d1-a101-490c-9375-f7ce0452f107.png',
    file: 'market-service-123456.png'
  },
  {
    key: 'serviceModel',
    title: '幸福驿站市场服务模型',
    source: 'G:/市场服务/市场服务模型.png',
    file: 'market-service-model.png'
  },
  {
    key: 'selfCheck',
    title: '幸福自检表',
    source: 'G:/市场服务/幸福自检表1125 (4)_00.png',
    file: 'happiness-self-check.png'
  },
  {
    key: 'strengthList',
    title: '幸福赢行优点清单',
    source: 'G:/市场服务/优点清单1125(4)_00.png',
    file: 'strength-list.png'
  }
];

fs.mkdirSync(assetsDir, { recursive: true });
assetFiles.forEach((asset) => {
  const target = path.join(assetsDir, asset.file);
  if (fs.existsSync(asset.source)) {
    fs.copyFileSync(asset.source, target);
  }
});

const sourceFiles = [
  {
    title: '幸福学院市场培训手册（1.0）',
    path: 'C:/Users/Administrator/.codex/attachments/474164d5-3991-4d5b-b68e-23cff00bbc3c/pasted-text.txt'
  },
  {
    title: '《7幸福训练营》复制标准流程',
    path: 'C:/Users/Administrator/.codex/attachments/cb81fed1-1f4d-44a7-832e-115f87ebeeb7/pasted-text.txt'
  }
];

const sources = sourceFiles.map((source) => ({
  title: source.title,
  content: fs.existsSync(source.path)
    ? fs.readFileSync(source.path, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    : ''
}));

const modules = [
  {
    id: 'core',
    number: '01',
    title: '核心逻辑',
    eyebrow: '先把底层逻辑立住',
    summary: '幸福驿站不是靠推销说服顾客，而是通过严格流程，让顾客在互动、作业、复盘中自己看见问题、自己决定行动、自己说服自己。',
    steps: ['吸引有需求的人', '用流程承接问题', '一次一次提要求', '布置作业并完成作业', '复盘调整心态', '顾客自己愿意继续学习'],
    sections: [
      {
        heading: '解决问题的逻辑',
        body: [
          '幸福驿站给人带来幸福，落点在关系处理；关系来源于一次一次沟通，很多问题是沟通出问题，一点点情绪叠加，最后酿成大祸。',
          '愿意放下情绪，愿意改变语言、语气、角度，就是获得幸福的唯一途径。',
          '很多市场开拓人员不自信，很多人是看到才相信；严格精密的流程，是为了让大家相信才看见。'
        ]
      },
      {
        heading: '复制总原则',
        body: [
          '我不相信人，我只相信流程。',
          '我们是用流程在帮助客户，不是用能力在帮助客户。',
          '标准里没有的，不要说，不要做；市场验证成熟有效，个人不能修改标准。'
        ]
      }
    ],
    checks: ['能说清“不是推销，是自己说服自己”', '能说清幸福落在关系和沟通上', '能坚持不随意发挥']
  },
  {
    id: 'entry',
    number: '02',
    title: '顾客从哪里来',
    eyebrow: '陌生人和转介绍分流',
    summary: '顾客入口分为破冰吸引来的陌生人、受益顾客口碑转介绍、沙龙结束后的继续学习需求。不同来源走不同入口，但都不脱离流程。',
    steps: ['破冰一对一或一对多', '问需要解决什么问题', '陌生人先参加1-2场沙龙', '转介绍可直接进7天幸福训练营', '沙龙后询问还有哪些问题'],
    sections: [
      {
        heading: '陌生人入口',
        body: [
          '破冰一对一（私信），破冰一对多（社群、朋友圈、直播等）也就是陌生人。',
          '破冰吸引来的，问对方需要解决什么问题，让顾客重视。',
          '先参加1~2场沙龙之后，再闭环7天幸福训练营。'
        ]
      },
      {
        heading: '转介绍入口',
        body: [
          '朋友转介绍来的，问对方带着什么问题来的，让顾客重视。',
          '转介绍客户可以直接参加幸福训练营。'
        ]
      }
    ],
    checks: ['能区分陌生人与转介绍', '不会把陌生人直接跳进后端流程', '能先问需求，让顾客重视']
  },
  {
    id: 'salon',
    number: '03',
    title: '幸福沙龙模块',
    eyebrow: '8步标准流程',
    summary: '沙龙是市场服务的核心入口：一场只讲一个主题，严格按照邀约、发心、热场、提要求、主题、分享、采访、心愿闭环走完整。',
    steps: ['邀约', '讲发心', '热场', '提要求', '主题', '分享', '引导式采访', '心愿闭环', '留作业、收作业'],
    sections: [
      {
        heading: '心态标准',
        body: [
          '只服务有真实幸福需求的人，不接受自称“完全幸福”的学员，用案例激活或幸福自检表让对号入座。',
          '遇到抗拒态度人员直接淘汰，不浪费时间。',
          '我们的态度决定学员态度，立好标准就不会被消耗。'
        ]
      },
      {
        heading: '动作标准',
        body: [
          '一个开沙龙的人一场沙龙只带2人，两个都是顾客，不允许旁听，只能参与。',
          '陌生人沙龙结束后面对面建群，方便留作业、收作业、通知下次沙龙；教练也要完成作业，并提交。',
          '每个开沙龙的人必须准备自己的发心故事，并完整通关。'
        ]
      },
      {
        heading: '复制标准',
        body: [
          '严格按照8步标准流程。',
          '复制核心原则：难度越小、内容越少，越容易推广复制。',
          '每天给开沙龙的人通关，确认对流程清晰，对内容理解，做到完全正确复制，不敷衍，不放水。'
        ]
      }
    ],
    checks: ['能按顺序背出沙龙8步', '知道一场只讲一个主题', '知道沙龙结束必须留作业、收作业']
  },
  {
    id: 'scripts',
    number: '04',
    title: '邀约与承接话术',
    eyebrow: '原文照搬',
    summary: '市场验证过的话术不改，页面把核心公式和原话收进话术库。服务人员需要能找到、能照读、能逐步脱稿。',
    steps: ['问题+动作+结果', '问题+案例+希望', '我学了什么+解决了什么+为什么分享', '顾客顾虑提前说', '限名额'],
    sections: [
      {
        heading: '邀约公式',
        body: [
          '我学会了什么 + 解决了我什么问题 + 我为什么一定让你来（点评）+ 顾客担心什么我就提前说什么（打消顾客顾虑）+ 限名额。'
        ]
      },
      {
        heading: '咨询生人承接',
        body: [
          '你这个问题啊，其实很简单。我有一个朋友，他家的孩子每次上学都磨磨蹭蹭不想去，写作业都写到晚上11点还写不完，在班级里更是倒数第六名。',
          '你看你如果想学的话，我就可以教给你，不用花钱，大概十分钟左右就可以学会，如果你也想学，只需要回复“我想幸福”，我免费交给你。'
        ]
      },
      {
        heading: '沙龙后转介绍承接',
        body: [
          '询问顾客还有哪些问题解决，亲子，父母，夫妻的等等。',
          '根据问题回复：您这个问题很简单，参加完我们的7天训练营，你自己都能找到原因，自己轻松解决。'
        ]
      }
    ],
    checks: ['能找到三种文字激活公式', '能照搬“你这个问题啊，其实很简单”', '能照搬7天营承接话术']
  },
  {
    id: 'homework',
    number: '05',
    title: '作业与复盘',
    eyebrow: '拿结果的关键动作',
    summary: '流程的精髓不是讲完，而是一次一次提要求，布置作业，完成作业，复盘调整。作业让学习落到真实关系和真实沟通。',
    steps: ['明确具体时间点', '学员回家表达', '文字或语音提交', '教练收作业', '效果不理想及时复盘', '找流程与教练问题'],
    sections: [
      {
        heading: '交作业的标准',
        body: [
          '你今天你给哪一个家人表达了，在哪一个场景下用的？',
          '你当时说了一段什么样的话，你的家人给了你什么样的一个反应或者反馈？',
          '你又是什么样的心情？',
          '提交方式：文字语音不限作业；提交时间：明天上午8点钟之前。'
        ]
      },
      {
        heading: '复盘标准',
        body: [
          '作业效果不理想，及时找到群主复盘，找到原因并帮助解决。',
          '两天开营如果没有效果，顾客没有受益，立马终止，赶紧复盘，找教练的问题，千万不要找客户的原因。',
          '要两个反馈：顾客的服务反馈，以及群主/教练的落地反馈。'
        ]
      }
    ],
    checks: ['能完整说出交作业三问', '知道提交时间', '知道效果不理想先复盘流程和教练']
  },
  {
    id: 'camp7',
    number: '06',
    title: '7天幸福训练营',
    eyebrow: '从沙龙筛选到持续学习',
    summary: '7天训练营的顾客从沙龙或转介绍来，不用邀约破冰。训练营持续通过发心、热场、提要求、主题训练、分享、采访、闭环、作业来交付幸福能力。',
    steps: ['第1天开营', '每天课前破冰', '榜样采访', '热场', '提要求', '主题训练', '分享', '采访', '闭环', '留作业、收作业'],
    sections: [
      {
        heading: '负责人心态标准',
        body: [
          '从沙龙筛选学习态度好、有受益拿到幸福的顾客。',
          '真知错的学员，当天就能完成作业；假知错的学员，一定会拖延，完不成作业。',
          '不配合、不按要求实践的学员，后面再给一次机会下次再参加，2次都不合格者，取消1年内学习资格。'
        ]
      },
      {
        heading: '动作标准',
        body: [
          '一个教练带2个顾客，就是一个幸福训练营，一天可以错开开设多个营，不混合开班。',
          '每天课程之前必须要通关，强化幸福能力交付，保证幸福教练掌握正确的标准。',
          '随时随地及时发现榜样，推荐榜样。'
        ]
      },
      {
        heading: '第1天开营',
        body: [
          '第1步：讲发心。我学到了什么？我收获了什么？走了哪些弯路？持续下去的结果？为什么我想做这样的幸福训练营。',
          '第2步：播放《蚂蚁死亡漩涡》视频。',
          '第3步：讨论，用自己的语言发问式，让大家看见家庭、关系、情绪和幸福能力之间的联系。',
          '第4步：讲群规。',
          '第5步：提醒大家准备笔和本子，下载好“腾讯会议”。'
        ]
      }
    ],
    checks: ['知道7天营不用邀约破冰', '知道一个教练带2个顾客', '知道每天课前通关、课后收作业']
  },
  {
    id: 'days',
    number: '07',
    title: '7天课程展开',
    eyebrow: '每天都能按流程找到内容',
    summary: '把7天训练营每天的破冰、榜样采访、热场、提要求、主题、分享、采访、闭环、作业放进同一套结构，减少翻文稿的成本。',
    steps: ['正式训练第1天', '正式训练第2天', '正式训练第3天', '正式训练第4天', '正式训练第5天', '正式训练第6天', '正式训练第7天'],
    sections: [
      {
        heading: '正式训练第1天',
        body: [
          '主题：高情商说话方式。互动游戏：虽然+但是。',
          '作业：用今天学到的方式至少给一到两个家人进行实践，最好先给自己的爱人实践，然后才是孩子及其他家人。'
        ]
      },
      {
        heading: '正式训练第2天',
        body: [
          '继续训练高情商说话方式，找朋友、发小、闺蜜、同学，分别找到一个优点和缺点，两两结对演练。',
          '采访重点：哪一种表达方式更能增加感情，哪一种让人和人之间更温暖。'
        ]
      },
      {
        heading: '正式训练第3天',
        body: [
          '互动游戏：找优点-辛苦和不容易。',
          '重点：写出对方的辛苦和不容易，因为看见别人的辛苦和不容易会幸福，看见自己的辛苦和不容易会痛苦。'
        ]
      },
      {
        heading: '正式训练第5天',
        body: [
          '共享陪听第三季智疗第41课《看不到别人的优点，你的人生就会黑暗》。',
          '作业：给父母发一个点评问候信息，或者打一个点评问候电话。'
        ]
      },
      {
        heading: '正式训练第6天',
        body: [
          '共享《老男人超哥》视频。',
          '采访重点：婚姻的本质是输赢还是幸福；多看对方付出，并及时给予肯定。'
        ]
      },
      {
        heading: '正式训练第7天',
        body: [
          '共享视频《你的烦恼或许正是你的幸福》。',
          '闭环：一天的学习不能解决一辈子的问题，只有持续学习，才不会让生活过得一地鸡毛。'
        ]
      }
    ],
    checks: ['能按天找到当天主题', '能找到当天作业', '能找到当天闭环话术']
  },
  {
    id: 'talent',
    number: '08',
    title: '幸福早课人才培养营',
    eyebrow: '从受益学员到复制人才',
    summary: '7天毕业且满足要求的学员，才能升级进入幸福早课人才培养营。先交付幸福能力，再交付健康管理能力，让顾客通过学习自然过渡。',
    steps: ['7天毕业且满足要求', '开营通知', '沟通主持人', '开营分享', '榜样案例分享', '相互介绍', '讲规则', '播放视频', '闭环到下一天'],
    sections: [
      {
        heading: '心态标准',
        body: [
          '7天毕业且满足要求的学员才能升级进入。',
          '全员每天必须完成作业，教练也要完成作业，并提交。',
          '先交付幸福能力，再交付健康管理能力，身心灵健康才是完整的健康。'
        ]
      },
      {
        heading: '动作标准',
        body: [
          '单营人数不超过10人，可同时开设多个营，不能混营。',
          '实行一人一课制度，每位讲师只负责讲1堂课。',
          '每天下午5点之后，发出第二天的课程破冰+课程，所有人提前预习。'
        ]
      }
    ],
    checks: ['知道升级条件', '知道单营不超过10人', '知道一人一课制度']
  },
  {
    id: 'model',
    number: '09',
    title: '榜样采访',
    eyebrow: '案例、口碑、资源循环',
    summary: '榜样从7天幸福营中产生，教练从榜样中产生。榜样采访用于形成口碑、激活榜样价值感、借榜样力量激活新资源。',
    steps: ['发现榜样', '进入榜样群', '按固定流程采访', '形成案例', '激活新资源', '筛选教练'],
    sections: [
      {
        heading: '采访作用',
        body: [
          '给咱们形成口碑，积累案例，验证咱们能解决问题，能帮到人。',
          '激活榜样，给榜样价值感。',
          '借榜样的力，激活身边有同样问题的人对号入座，从而想主动参与。'
        ]
      },
      {
        heading: '关键发问',
        body: [
          '你当时是带着什么问题来的？',
          '你在学习第几天的时候，家里开始改变的？',
          '当时是在什么场景下给家人用的？说了些什么话？',
          '表达完家人是什么反应，或者给了你什么反馈？',
          '你拿到幸福以后，你愿意把你的经历分享出来，去帮助他们从家庭内耗的泥潭里摆脱出来吗？'
        ]
      }
    ],
    checks: ['知道榜样从7天幸福营产生', '能按采访问题一问一答', '知道采访不是闲聊，是形成资源循环']
  },
  {
    id: 'coach',
    number: '10',
    title: '教练招募与严格复制',
    eyebrow: '顾客服务顾客',
    summary: '教练招募优先从被采访过、拿到幸福的榜样中产生。筛选标准不是热情，而是时间、受益、家人支持和严格执行流程。',
    steps: ['必须是受益者', '有时间有精力', '家人支持', '严格执行流程和标准', '每天汇报反馈', '顾客服务顾客'],
    sections: [
      {
        heading: '教练筛选标准',
        body: [
          '做幸福教练要确定自己有时间做幸福训练营，有精力；如果没有时间，暂时先不做。',
          '自己必须是幸福的受益者。',
          '需要家人支持。',
          '严格执行流程和标准。'
        ]
      },
      {
        heading: '复制要求',
        body: [
          '百分百按照标准流程复制，不用自己的老思维随意增减内容。',
          '总教练给教练通关，教练给组长通关，组长给组员通关。',
          '一天通一节课，通一节实战一节。',
          '所有参与复制的老师，每天必须群里汇报。'
        ]
      }
    ],
    checks: ['知道教练必须是受益者', '知道需要家人支持', '知道每天汇报两个反馈']
  }
];

const scriptLibrary = [
  {
    title: '咨询生人承接',
    tag: '沙龙邀约',
    text: '你这个问题啊，其实很简单。我有一个朋友，他家的孩子每次上学都磨磨蹭蹭不想去，写作业都写到晚上11点还写不完，在班级里更是倒数第六名。后来我教会这个妈妈一个幸福沙龙的互动游戏，回到家里用在孩子身上，仅仅两三个月的时间，这个孩子现在几乎每次考试都拿100分，在班级里稳居前三。\n\n你如果学会了这种游戏，你的孩子也能发生翻天覆地的变化，爱学习、不叛逆、不抬杠、又懂事。你看你如果想学的话，我就可以教给你，不用花钱，大概十分钟左右就可以学会，如果你也想学，只需要回复“我想幸福”，我免费交给你。'
  },
  {
    title: '沙龙持续学习闭环',
    tag: '心愿闭环',
    text: '今天这场学习有没有帮到大家？学起来是不是特别的简单？有没有一种恍然大悟的感觉？像这样简单易学的内容，我们有很多，每一次的学习都解决一个问题，如果大家能把这些都学会，那我们都成了解决问题的高手。无论是健康方面的或者是幸福方面的，我们都能轻松解决。你看你如果愿意继续学习的话，下一场沙龙我再通知您。'
  },
  {
    title: '沙龙后转介绍承接',
    tag: '7天营',
    text: '询问顾客还有哪些问题解决，亲子，父母，夫妻的等等。\n\n根据问题回复：您这个问题很简单，参加完我们的7天训练营，你自己都能找到原因，自己轻松解决。'
  },
  {
    title: '训练营提要求',
    tag: '提要求',
    text: '大家想早一天解决问题，还是晚一天解决问题？大家想早一天幸福，还是晚一天幸福？最好的办法就是一定要按照标准参与。\n1.学习中间不要走开，尽量全程参与。\n2.每个人都参与进来（看别人炒菜和自己动手炒菜，谁学会的更快）。\n3.学习过程中不要接打电话，以免耽误自己学习。'
  },
  {
    title: '作业标准',
    tag: '留作业、收作业',
    text: '你今天你给哪一个家人表达了，在哪一个场景下用的？\n你当时说了一段什么样的话，你的家人给了你什么样的一个反应或者反馈？\n你又是什么样的心情？\n\n提交方式:文字语音不限作业\n提交时间:明天上午8点钟之前'
  }
];

const quickFlows = [
  {
    title: '生人咨询',
    tag: '先入沙龙',
    steps: ['问清问题', '不分析问题', '固定话术承接', '进入免费幸福沙龙'],
    standard: '你这个问题啊，其实很简单。先参加一个免费幸福沙龙，你自己都能找到原因，自己解决。'
  },
  {
    title: '沙龙前',
    tag: '只做准备',
    steps: ['确认真实需求', '确认参与身份', '准备发心故事', '准备一个主题'],
    standard: '沙龙不是讲知识，是引导场景体验；一场只讲一个主题，不能随意发挥。'
  },
  {
    title: '沙龙中',
    tag: '严格8步',
    steps: ['邀约', '讲发心', '热场', '提要求', '主题', '分享', '引导式采访', '心愿闭环'],
    standard: '核心不是你讲得多好，而是学员有没有参与、有没有看见自己、有没有愿意行动。'
  },
  {
    title: '沙龙后复盘',
    tag: '留作业收作业',
    steps: ['问还有哪些问题', '承接7天训练营', '布置作业', '约定提交时间', '收反馈', '复盘教练和流程'],
    standard: '沙龙后必须闭环：不只是结束活动，而是让学员带着行动进入下一步。'
  },
  {
    title: '7天训练营',
    tag: '持续交付',
    steps: ['开营发心', '每日提要求', '主题训练', '作业实践', '榜样采访', '闭环升级'],
    standard: '每天都通过提要求、作业、复盘，让学员自己发现错误，自己决定改变。'
  },
  {
    title: '报名承接',
    tag: '自己愿意',
    steps: ['确认受益', '确认行动', '确认家人支持', '说明持续学习', '进入大课或复制系统'],
    standard: '不是推销东西，而是学员在流程里看见结果后，自己愿意继续走。'
  }
];

const serviceFramework = [
  {
    number: '1',
    title: '一个中心',
    body: '扶正祛邪。不要先痴迷于方法，不管销售什么，顾客一定不喜欢满腹牢骚、眼里满是缺点的市场服务顾问。'
  },
  {
    number: '2',
    title: '两个基本点',
    body: '转念：把注意力引回自己；做选择题：用标准帮助学员做选择题，自己听明白，自己想明白。'
  },
  {
    number: '3',
    title: '三种学员不收',
    body: '家人反对坚决的不收；有经济负担的不收，不刷信用卡、不借钱学习；不愿为家庭付出、只想坐享其成的不收。只收一种学员：愿意为自己和家人的幸福负责，下定决心成长改变的人。'
  },
  {
    number: '4',
    title: '四个步骤',
    body: '检测：幸福自检表，问题可视化；诊断：一正一反对比，问出核心点，让顾客知错；方案：基础群、公益课、专栏、研学班等不同阶段提升免疫力；陪伴：共同成长陪伴，接幸福回家。'
  },
  {
    number: '5',
    title: '五步人才培养',
    body: '激活让学员感兴趣，排队让学员想学，筛选让学员改变，培养让学员帮助别人，裂变让伙伴重复以上四步。'
  },
  {
    number: '6',
    title: '六个销售武器',
    body: '精通产品、销售问题、主线提问、销售流程、案例榜样、工具宝库。始终记得主要任务是让学员进入学习。'
  },
  {
    number: '7',
    title: '七步沙龙后复盘闭环',
    body: '复盘需求、复盘提要求、复盘参与度、复盘作业、复盘反馈、复盘下一步承接、复盘教练是否严格按照流程。'
  }
];

const salonReview = [
  '角色定位是否清楚：你是站主/导师，不传授知识，只帮助找到问题、激活学习心态。',
  '是否只做流程：没有陷入分析、安慰、辩论、证明自己专业。',
  '是否完成8步：邀约、讲发心、热场、提要求、主题、分享、引导式采访、心愿闭环。',
  '是否做到转念：点评引导顾客的注意力在自己身上，而不是抱怨家人。',
  '是否做选择题：用张老师标准帮助学员选择，不替学员下结论。',
  '是否布置作业：作业有对象、场景、原话、反馈、心情和提交时间。',
  '是否收作业：沙龙结束不是结束，必须跟进作业和反馈。',
  '是否承接下一步：根据顾客问题，引入7天幸福训练营。',
  '是否复盘自己：效果不好先找教练和流程问题，不找客户原因。'
];

const expertQuestions = [
  '你是在解决问题，还是在引导进入流程？',
  '你有没有把顾客注意力从家人缺点，点评到他自己可以改变的语言、语气、角度？',
  '你是否用幸福自检表让问题可视化，而不是靠自己判断？',
  '你是否用了“转念”和“做选择题”，让学员自己知错、自己想明白？',
  '沙龙结束后，是否布置作业并收作业？',
  '你的闭环有没有把学员带到7天训练营，而不是停留在一次活动？',
  '你有没有随意发挥、增加内容、弱化标准？',
  '你能不能让一个新手驿站主照着你的复盘记录，复刻同样流程？'
];

const personaPaths = [
  {
    title: '新手驿站主',
    need: '先不要追求会讲，先会按流程找标准。',
    flow: ['看市场服务1234567', '照着快速找流程', '使用固定话术', '沙龙后按复盘清单核对']
  },
  {
    title: '沙龙主持人',
    need: '重点管住流程，不被现场问题带跑。',
    flow: ['沙龙前确认角色定位', '沙龙中严格8步', '沙龙后留作业收作业', '用专家质询复盘']
  },
  {
    title: '训练营带班人',
    need: '每天持续提要求、收作业、找榜样。',
    flow: ['第1天开营', '每日主题训练', '每日作业反馈', '榜样采访', '闭环升级']
  },
  {
    title: '市场负责人',
    need: '看团队有没有按标准复制，而不是看个人发挥。',
    flow: ['检查三目标', '检查四步服务流程与人才漏斗', '检查五步人才培养', '检查六个销售武器', '检查每日反馈']
  }
];

const toolbox = [
  {
    title: '驿站主市场服务123456（3.0）',
    image: 'assets/market-service-123456.png',
    text: '角色定位、两件主线任务、三个必做目标、四步服务流程与人才漏斗、五步人才培养、六个销售武器。'
  },
  {
    title: '幸福驿站市场服务模型',
    image: 'assets/market-service-model.png',
    text: '一个中心、两个基本点、四个步骤、三种学员不收、只收一种学员，适用于一对一、沙龙、直播等客户服务过程。'
  },
  {
    title: '幸福自检表',
    image: 'assets/happiness-self-check.png',
    text: '检测工具，覆盖亲子教育、夫妻相处、人际关系、身体健康、事业心态，让顾客的问题可视化。'
  },
  {
    title: '幸福赢行优点清单',
    image: 'assets/strength-list.png',
    text: '训练看优点的工具。挑对方的缺点，痛苦缠上身；看对方的优点，幸福来敲门。'
  }
];

const data = { modules, scriptLibrary, sources, quickFlows, serviceFramework, salonReview, expertQuestions, personaPaths, toolbox };

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>幸福驿站市场服务流程手册</title>
  <link rel="icon" href="data:,">
  <style>
    :root {
      --ink: #1d1d1f;
      --muted: #6e6e73;
      --line: rgba(0,0,0,.08);
      --panel: rgba(255,255,255,.78);
      --panel-solid: #fff;
      --page: #f5f5f7;
      --blue: #0071e3;
      --green: #248a55;
      --orange: #b76400;
      --pink: #b8326d;
      --shadow: 0 24px 70px rgba(0,0,0,.10);
      color-scheme: light;
      font-family: "Microsoft YaHei", "PingFang SC", "SF Pro Display", "Segoe UI", Arial, sans-serif;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      color: var(--ink);
      background:
        radial-gradient(circle at 18% -12%, rgba(255,255,255,.98), transparent 30rem),
        radial-gradient(circle at 82% 0%, rgba(219,236,255,.9), transparent 28rem),
        linear-gradient(180deg, #fbfbfd 0%, var(--page) 46%, #fff 100%);
    }
    button, input { font: inherit; }
    button { cursor: pointer; }
    .topbar {
      position: sticky;
      top: 0;
      z-index: 20;
      backdrop-filter: saturate(180%) blur(18px);
      background: rgba(251,251,253,.78);
      border-bottom: 1px solid var(--line);
    }
    .topbar-inner {
      width: min(1180px, calc(100% - 32px));
      min-height: 54px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      font-weight: 800;
      white-space: nowrap;
    }
    .brand-logo {
      width: 132px;
      height: auto;
      display: block;
    }
    .brand-dot {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: linear-gradient(135deg, #111 0%, #555 100%);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.4);
    }
    .top-links {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .top-links::-webkit-scrollbar { display: none; }
    .top-links a {
      color: #3a3a3c;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    .hero {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 64px 0 38px;
      text-align: center;
    }
    .eyebrow {
      margin: 0 0 12px;
      color: var(--blue);
      font-size: 15px;
      font-weight: 800;
    }
    h1 {
      margin: 0 auto;
      max-width: 880px;
      font-size: clamp(38px, 8vw, 82px);
      line-height: .98;
      letter-spacing: 0;
    }
    .hero-copy {
      max-width: 820px;
      margin: 22px auto 0;
      color: var(--muted);
      font-size: clamp(17px, 2.8vw, 25px);
      line-height: 1.45;
      font-weight: 650;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 28px;
    }
    .pill-link, .ghost-link, .copy-button {
      border: 0;
      border-radius: 999px;
      padding: 10px 18px;
      text-decoration: none;
      font-weight: 800;
      font-size: 14px;
      white-space: nowrap;
    }
    .pill-link {
      color: #fff;
      background: var(--blue);
      box-shadow: 0 12px 28px rgba(0,113,227,.22);
    }
    .ghost-link, .copy-button {
      color: var(--blue);
      background: rgba(0,113,227,.10);
    }
    .layout {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto 56px;
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr);
      gap: 24px;
      align-items: start;
    }
    .sidebar {
      position: sticky;
      top: 74px;
      display: grid;
      gap: 14px;
    }
    .search {
      width: 100%;
      height: 46px;
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 0 14px;
      outline: none;
      background: rgba(255,255,255,.86);
      box-shadow: 0 10px 30px rgba(0,0,0,.05);
      font-weight: 700;
    }
    .search:focus {
      border-color: rgba(0,113,227,.38);
      box-shadow: 0 0 0 4px rgba(0,113,227,.12);
    }
    .module-nav {
      display: grid;
      gap: 6px;
      padding: 8px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: rgba(255,255,255,.72);
      box-shadow: 0 18px 50px rgba(0,0,0,.06);
    }
    .module-nav button {
      width: 100%;
      border: 0;
      border-radius: 14px;
      padding: 10px 12px;
      background: transparent;
      color: #3a3a3c;
      text-align: left;
      font-size: 13px;
      font-weight: 800;
    }
    .module-nav button.active {
      color: var(--blue);
      background: rgba(0,113,227,.10);
    }
    .content {
      min-width: 0;
      display: grid;
      gap: 24px;
    }
    .band {
      border-radius: 30px;
      border: 1px solid var(--line);
      background: var(--panel);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .band-inner { padding: clamp(20px, 4vw, 34px); }
    .band h2 {
      margin: 0;
      font-size: clamp(25px, 4vw, 44px);
      line-height: 1.06;
      letter-spacing: 0;
    }
    .band p {
      color: var(--muted);
      line-height: 1.65;
      font-size: 15px;
    }
    .logic-grid, .process-map {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 18px;
    }
    .logic-card, .process-step, .flow-card, .framework-card, .persona-card {
      min-width: 0;
      border-radius: 22px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.74);
      padding: 16px;
    }
    .logic-card strong, .process-step strong {
      display: block;
      font-size: 17px;
      line-height: 1.3;
    }
    .process-step span {
      display: inline-grid;
      place-items: center;
      width: 28px;
      height: 28px;
      margin-bottom: 12px;
      border-radius: 50%;
      background: #111;
      color: #fff;
      font-size: 12px;
      font-weight: 900;
    }
    .hero-logo {
      width: min(360px, 82vw);
      height: auto;
      margin: 0 auto 30px;
      display: block;
    }
    .entry-grid, .framework-grid, .persona-grid, .tool-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 18px;
    }
    .flow-card h3, .framework-card h3, .persona-card h3, .tool-card h3 {
      margin: 0 0 10px;
      font-size: 20px;
      line-height: 1.25;
    }
    .flow-card ol, .persona-card ol, .review-list, .question-list {
      margin: 12px 0 0;
      padding-left: 20px;
      color: #3a3a3c;
      line-height: 1.65;
      font-weight: 650;
    }
    .standard {
      margin-top: 12px;
      border-radius: 16px;
      padding: 12px;
      color: #1d1d1f;
      background: rgba(0,113,227,.08);
      font-weight: 800;
      line-height: 1.55;
    }
    .framework-card {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 12px;
    }
    .framework-number {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: #111;
      font-weight: 900;
    }
    .review-list li, .question-list li {
      margin: 10px 0;
      border-radius: 16px;
      padding: 12px 14px;
      background: rgba(255,255,255,.78);
      border: 1px solid var(--line);
    }
    .tool-card {
      min-width: 0;
      border-radius: 24px;
      border: 1px solid var(--line);
      background: #fff;
      overflow: hidden;
    }
    .tool-card img {
      width: 100%;
      max-width: 100%;
      height: auto;
      display: block;
      background: #fff;
    }
    .tool-card-body { padding: 16px; }
    .image-link {
      display: inline-flex;
      margin-top: 10px;
      color: var(--blue);
      text-decoration: none;
      font-weight: 900;
    }
    .module-grid {
      display: grid;
      gap: 18px;
    }
    .module-card {
      scroll-margin-top: 76px;
      border-radius: 30px;
      border: 1px solid var(--line);
      background: var(--panel-solid);
      box-shadow: 0 16px 48px rgba(0,0,0,.07);
      overflow: hidden;
    }
    .module-head {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 16px;
      padding: 24px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, #fff 0%, #fafafa 100%);
    }
    .module-number {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border-radius: 16px;
      background: #111;
      color: #fff;
      font-weight: 900;
    }
    .module-head h3 {
      margin: 4px 0 8px;
      font-size: clamp(23px, 3vw, 34px);
      line-height: 1.08;
    }
    .module-body {
      display: grid;
      gap: 18px;
      padding: 24px;
    }
    .step-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .step-chip {
      border-radius: 999px;
      padding: 8px 11px;
      background: #f5f5f7;
      font-size: 13px;
      font-weight: 800;
      color: #3a3a3c;
    }
    .section-grid {
      display: grid;
      gap: 12px;
    }
    .section-block {
      border-radius: 22px;
      padding: 18px;
      background: #f7f7f8;
    }
    .section-block h4 {
      margin: 0 0 10px;
      font-size: 18px;
    }
    .section-block ul {
      margin: 0;
      padding-left: 18px;
      color: #3a3a3c;
      line-height: 1.68;
      font-weight: 650;
    }
    .check-panel {
      border-radius: 22px;
      padding: 16px;
      background: rgba(0,113,227,.08);
    }
    .check-panel strong { display: block; margin-bottom: 10px; }
    .check-item {
      width: 100%;
      border: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      background: transparent;
      text-align: left;
      color: #1d1d1f;
      font-weight: 750;
    }
    .check-dot {
      width: 22px;
      height: 22px;
      flex: 0 0 auto;
      border-radius: 50%;
      border: 2px solid rgba(0,113,227,.45);
    }
    .check-item.done .check-dot {
      border-color: var(--blue);
      background: var(--blue);
      box-shadow: inset 0 0 0 5px #fff;
    }
    .script-grid {
      display: grid;
      gap: 14px;
      margin-top: 18px;
    }
    .script-card {
      border: 1px solid var(--line);
      border-radius: 24px;
      background: #fff;
      padding: 18px;
    }
    .script-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    .script-card h3 { margin: 0; font-size: 19px; }
    .tag {
      display: inline-block;
      margin-top: 8px;
      border-radius: 999px;
      padding: 5px 9px;
      background: #f5f5f7;
      color: var(--muted);
      font-size: 12px;
      font-weight: 800;
    }
    .script-text, .source-text {
      white-space: pre-wrap;
      color: #2c2c2e;
      line-height: 1.68;
      font-size: 14px;
      font-weight: 600;
    }
    details.source-box {
      border-radius: 24px;
      border: 1px solid var(--line);
      background: #fff;
      padding: 16px 18px;
      margin-top: 14px;
    }
    details.source-box summary {
      cursor: pointer;
      font-weight: 900;
    }
    mark {
      background: rgba(255,214,10,.45);
      border-radius: 4px;
      padding: 0 2px;
    }
    .hidden { display: none !important; }
    .empty {
      display: none;
      padding: 18px;
      border-radius: 22px;
      background: #fff;
      color: var(--muted);
      font-weight: 800;
    }
    .empty.show { display: block; }
    @media (max-width: 860px) {
      .topbar-inner, .hero, .layout { width: min(100% - 20px, 680px); }
      .layout { grid-template-columns: 1fr; }
      .sidebar { position: static; }
      .module-nav {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .module-nav::-webkit-scrollbar { display: none; }
      .module-nav button {
        flex: 0 0 auto;
        width: auto;
        white-space: nowrap;
      }
      .logic-grid, .process-map, .entry-grid, .framework-grid, .persona-grid, .tool-grid { grid-template-columns: 1fr; }
      .module-head { grid-template-columns: 1fr; }
      .top-links { display: none; }
      .brand-logo { width: 116px; }
    }
    @media (max-width: 420px) {
      .hero { padding-top: 42px; }
      .band-inner, .module-body, .module-head { padding: 18px; }
      h1 { font-size: 38px; }
    }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand"><img class="brand-logo" src="assets/logo.png" alt="幸福驿站"></div>
      <nav class="top-links" aria-label="页面导航">
        <a href="#process">总流程</a>
        <a href="#quickFlows">快速找流程</a>
        <a href="#salonReview">沙龙后复盘</a>
        <a href="#toolbox">工具与模型</a>
        <a href="#modules">完整流程手册</a>
        <a href="#scripts">原文话术库</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <img class="hero-logo" src="assets/logo.png" alt="幸福驿站">
      <p class="eyebrow">核心是流程：能快速找到标准，沙龙后能照着复盘</p>
      <h1>幸福驿站市场服务流程手册</h1>
      <p class="hero-copy">把原来需要翻文稿的内容，整理成驿站主市场服务工作台。10万驿站主使用时，第一秒要知道下一步做什么，沙龙后要能按流程标准复盘。</p>
      <div class="hero-actions">
        <a class="pill-link" href="#quickFlows">快速找流程</a>
        <a class="ghost-link" href="#salonReview">沙龙后复盘</a>
        <a class="ghost-link" href="#toolbox">工具与模型</a>
      </div>
    </section>

    <section class="layout">
      <aside class="sidebar">
        <input class="search" id="manualSearch" type="search" placeholder="搜索流程、话术、作业、孩子、夫妻…" autocomplete="off">
        <nav class="module-nav" id="moduleNav" aria-label="模块导航"></nav>
      </aside>

      <div class="content">
        <section class="band" id="process">
          <div class="band-inner">
            <p class="eyebrow">总流程</p>
            <h2>从吸引，到学员自己愿意继续走。</h2>
            <p>这不是推销路径，而是服务路径。用严格流程让学员在互动学习里看到自己的错误，愿意放下情绪，愿意改变语言、语气、角度，就是获得幸福的唯一途径。</p>
            <div class="process-map" id="processMap">
              <div class="process-step"><span>1</span><strong>吸引破冰</strong><p>用案例和痛点吸引真实幸福需求。</p></div>
              <div class="process-step"><span>2</span><strong>免费幸福沙龙</strong><p>按8步标准流程体验，不能随意发挥。</p></div>
              <div class="process-step"><span>3</span><strong>作业与复盘</strong><p>一次一次提要求，布置作业，完成作业。</p></div>
              <div class="process-step"><span>4</span><strong>7天幸福训练营</strong><p>持续互动、反馈、调整，让学员自己说服自己。</p></div>
              <div class="process-step"><span>5</span><strong>榜样采访</strong><p>形成案例口碑，激活榜样价值感。</p></div>
              <div class="process-step"><span>6</span><strong>大课与复制</strong><p>顾客自己愿意，进入幸福驿站大课和复制系统。</p></div>
              <div class="process-step"><span>7</span><strong>市场服务1234567</strong><p>用123456定标准，用第7步沙龙后复盘闭环拿结果。</p></div>
            </div>
          </div>
        </section>

        <section class="band" id="quickFlows">
          <div class="band-inner">
            <p class="eyebrow">快速找流程</p>
            <h2>先按场景入口找标准，再进入完整文稿。</h2>
            <p>这是给驿站主现场使用的第一层入口：顾客问什么不重要，重要的是服务人员能不能把对方带进正确流程。</p>
            <div class="entry-grid" id="quickFlowGrid"></div>
          </div>
        </section>

        <section class="band" id="service1234567">
          <div class="band-inner">
            <p class="eyebrow">市场服务1234567</p>
            <h2>用一套数字框架管住全部市场服务动作。</h2>
            <p>123456来自市场服务标准，新增第7步专门服务沙龙后复盘。核心是角色定位清楚、流程标准清楚、复盘动作清楚。</p>
            <div class="framework-grid" id="frameworkGrid"></div>
          </div>
        </section>

        <section class="band" id="salonReview">
          <div class="band-inner">
            <p class="eyebrow">沙龙后复盘</p>
            <h2>活动结束后，对照复盘清单看是否按要求执行。</h2>
            <p>复盘不是找客户原因，而是看自己有没有按流程标准做，哪里漏了，下一次怎么补。</p>
            <ol class="review-list" id="reviewList"></ol>
          </div>
        </section>

        <section class="band" id="expertQuestions">
          <div class="band-inner">
            <p class="eyebrow">专家质询</p>
            <h2>用专家问题把执行动作问到底。</h2>
            <p>这些问题模拟市场负责人和专家质询：一问就能知道你是在按流程服务，还是被现场情绪带跑。</p>
            <ol class="question-list" id="questionList"></ol>
          </div>
        </section>

        <section class="band" id="personaPaths">
          <div class="band-inner">
            <p class="eyebrow">10万驿站主使用体验模拟</p>
            <h2>不同角色，只看自己当下最需要执行的流程。</h2>
            <p>新手先找流程，主持人守沙龙，带班人抓作业，负责人看复制标准。场景入口清楚，使用才快。</p>
            <div class="persona-grid" id="personaGrid"></div>
          </div>
        </section>

        <section class="band">
          <div class="band-inner">
            <p class="eyebrow">核心逻辑</p>
            <h2>流程让人相信，行动让人看见。</h2>
            <div class="logic-grid">
              <div class="logic-card"><strong>不是推销</strong><p>吸引之后，顾客自己愿意，自己说服自己。</p></div>
              <div class="logic-card"><strong>不是咨询</strong><p>不靠个人能力分析问题，用流程帮助客户。</p></div>
              <div class="logic-card"><strong>不是背稿</strong><p>根据流程找到原文，照着做，再逐步脱稿。</p></div>
            </div>
          </div>
        </section>

        <section id="modules">
          <div class="band">
            <div class="band-inner">
              <p class="eyebrow">完整流程手册</p>
              <h2>所有模块按执行顺序展开。</h2>
              <p>每个模块保留标准、动作、话术和轻量通关。训练只是辅助，主任务是让服务人员能按流程找到内容。</p>
            </div>
          </div>
          <div class="module-grid" id="moduleGrid"></div>
          <div class="empty" id="emptyState">没有匹配内容，换一个关键词试试。</div>
        </section>

        <section class="band" id="scripts">
          <div class="band-inner">
            <p class="eyebrow">原文话术库</p>
            <h2>常用话术直接照搬。</h2>
            <p>这里不做改写，服务人员先照着用，熟练后再脱稿。</p>
            <div class="script-grid" id="scriptLibrary"></div>
          </div>
        </section>

        <section class="band" id="toolbox">
          <div class="band-inner">
            <p class="eyebrow">工具与模型</p>
            <h2>模型、表格和原图都放在这里，现场能直接对照。</h2>
            <p>幸福自检表用于检测，优点清单用于转念，市场服务模型用于把客户服务过程统一到检测、诊断、方案、陪伴。</p>
            <div class="tool-grid" id="toolGrid"></div>
          </div>
        </section>

        <section class="band" id="raw">
          <div class="band-inner">
            <p class="eyebrow">原文全文</p>
            <h2>完整文稿也在页面里。</h2>
            <p>上面是流程化展示；这里保留两份原始文稿全文，便于搜索、核对和回到原文。</p>
            <div id="rawManual"></div>
          </div>
        </section>
      </div>
    </section>
  </main>

  <script type="application/json" id="manualData">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  <script>
    const manual = JSON.parse(document.getElementById('manualData').textContent);
    const nav = document.getElementById('moduleNav');
    const moduleGrid = document.getElementById('moduleGrid');
    const scriptLibrary = document.getElementById('scriptLibrary');
    const rawManual = document.getElementById('rawManual');
    const search = document.getElementById('manualSearch');
    const emptyState = document.getElementById('emptyState');
    const quickFlowGrid = document.getElementById('quickFlowGrid');
    const frameworkGrid = document.getElementById('frameworkGrid');
    const reviewList = document.getElementById('reviewList');
    const questionList = document.getElementById('questionList');
    const personaGrid = document.getElementById('personaGrid');
    const toolGrid = document.getElementById('toolGrid');

    function normalizeText(value) {
      return String(value || '').toLowerCase().replace(/\\s+/g, '');
    }

    function safeHtml(value) {
      return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function moduleSearchText(module) {
      return [
        module.title,
        module.eyebrow,
        module.summary,
        module.steps.join(' '),
        module.sections.map((section) => [section.heading, ...section.body].join(' ')).join(' '),
        module.checks.join(' ')
      ].join(' ');
    }

    function setActiveModule(id) {
      document.querySelectorAll('[data-nav-id]').forEach((button) => {
        button.classList.toggle('active', button.dataset.navId === id);
      });
    }

    function toggleCheck(button) {
      button.classList.toggle('done');
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        const area = document.createElement('textarea');
        area.value = text;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
    }

    function renderNav() {
      nav.innerHTML = manual.modules.map((module) => (
        '<button type="button" data-nav-id="' + module.id + '">' + module.number + ' ' + module.title + '</button>'
      )).join('');
      nav.querySelectorAll('[data-nav-id]').forEach((button) => {
        button.addEventListener('click', () => {
          setActiveModule(button.dataset.navId);
          document.getElementById('module-' + button.dataset.navId).scrollIntoView({ block: 'start' });
        });
      });
    }

    function renderQuickFlows() {
      quickFlowGrid.innerHTML = manual.quickFlows.map((flow) => {
        const searchText = [flow.title, flow.tag, flow.standard, flow.steps.join(' ')].join(' ');
        return '<article class="flow-card" data-search-text="' + safeHtml(searchText) + '">' +
          '<span class="tag">' + safeHtml(flow.tag) + '</span>' +
          '<h3>' + safeHtml(flow.title) + '</h3>' +
          '<ol>' + flow.steps.map((step) => '<li>' + safeHtml(step) + '</li>').join('') + '</ol>' +
          '<div class="standard">流程标准：' + safeHtml(flow.standard) + '</div>' +
        '</article>';
      }).join('');
    }

    function renderFramework() {
      frameworkGrid.innerHTML = manual.serviceFramework.map((item) => (
        '<article class="framework-card" data-search-text="' + safeHtml([item.number, item.title, item.body].join(' ')) + '">' +
          '<div class="framework-number">' + safeHtml(item.number) + '</div>' +
          '<div><h3>' + safeHtml(item.title) + '</h3><p>' + safeHtml(item.body) + '</p></div>' +
        '</article>'
      )).join('');
    }

    function renderReviewTools() {
      reviewList.innerHTML = manual.salonReview.map((item) => (
        '<li data-search-text="' + safeHtml(item) + '">' + safeHtml(item) + '</li>'
      )).join('');
      questionList.innerHTML = manual.expertQuestions.map((item) => (
        '<li data-search-text="' + safeHtml(item) + '">' + safeHtml(item) + '</li>'
      )).join('');
    }

    function renderPersonas() {
      personaGrid.innerHTML = manual.personaPaths.map((persona) => {
        const searchText = [persona.title, persona.need, persona.flow.join(' ')].join(' ');
        return '<article class="persona-card" data-search-text="' + safeHtml(searchText) + '">' +
          '<h3>' + safeHtml(persona.title) + '</h3>' +
          '<p>' + safeHtml(persona.need) + '</p>' +
          '<ol>' + persona.flow.map((step) => '<li>' + safeHtml(step) + '</li>').join('') + '</ol>' +
        '</article>';
      }).join('');
    }

    function renderToolbox() {
      toolGrid.innerHTML = manual.toolbox.map((tool) => (
        '<article class="tool-card" data-search-text="' + safeHtml([tool.title, tool.text].join(' ')) + '">' +
          '<a href="' + safeHtml(tool.image) + '" target="_blank" rel="noopener"><img src="' + safeHtml(tool.image) + '" alt="' + safeHtml(tool.title) + '"></a>' +
          '<div class="tool-card-body"><h3>' + safeHtml(tool.title) + '</h3><p>' + safeHtml(tool.text) + '</p>' +
          '<a class="image-link" href="' + safeHtml(tool.image) + '" target="_blank" rel="noopener">查看原图</a></div>' +
        '</article>'
      )).join('');
    }

    function renderModules() {
      moduleGrid.innerHTML = manual.modules.map((module) => {
        const sections = module.sections.map((section) => (
          '<div class="section-block"><h4>' + section.heading + '</h4><ul>' +
          section.body.map((line) => '<li>' + line + '</li>').join('') +
          '</ul></div>'
        )).join('');
        const steps = module.steps.map((step) => '<span class="step-chip">' + step + '</span>').join('');
        const checks = module.checks.map((check) => (
          '<button type="button" class="check-item"><span class="check-dot"></span><span>' + check + '</span></button>'
        )).join('');
        return '<article class="module-card" id="module-' + module.id + '" data-module-id="' + module.id + '" data-search-text="' + moduleSearchText(module).replace(/"/g, '&quot;') + '">' +
          '<div class="module-head"><div class="module-number">' + module.number + '</div><div><p class="eyebrow">' + module.eyebrow + '</p><h3>' + module.title + '</h3><p>' + module.summary + '</p></div></div>' +
          '<div class="module-body"><div class="step-row">' + steps + '</div><div class="section-grid">' + sections + '</div><div class="check-panel"><strong>轻量通关</strong>' + checks + '</div></div>' +
          '</article>';
      }).join('');
      moduleGrid.querySelectorAll('.check-item').forEach((button) => {
        button.addEventListener('click', () => toggleCheck(button));
      });
    }

    function renderScripts() {
      scriptLibrary.innerHTML = manual.scriptLibrary.map((item, index) => (
        '<article class="script-card" data-search-text="' + [item.title, item.tag, item.text].join(' ').replace(/"/g, '&quot;') + '">' +
          '<div class="script-top"><div><h3>' + item.title + '</h3><span class="tag">' + item.tag + '</span></div><button type="button" class="copy-button" data-copy-index="' + index + '">复制</button></div>' +
          '<div class="script-text">' + item.text + '</div>' +
        '</article>'
      )).join('');
      scriptLibrary.querySelectorAll('[data-copy-index]').forEach((button) => {
        button.addEventListener('click', () => copyText(manual.scriptLibrary[Number(button.dataset.copyIndex)].text));
      });
    }

    function renderRawManual() {
      rawManual.innerHTML = manual.sources.map((source) => (
        '<details class="source-box" open><summary>' + source.title + '</summary><div class="source-text">' + source.content + '</div></details>'
      )).join('');
    }

    function filterManual() {
      const query = normalizeText(search.value);
      let visible = 0;
      document.querySelectorAll('[data-search-text]').forEach((item) => {
        const haystack = normalizeText(item.dataset.searchText);
        const match = !query || haystack.includes(query);
        item.classList.toggle('hidden', !match);
        if (match) visible += 1;
      });
      emptyState.classList.toggle('show', visible === 0);
    }

    renderNav();
    renderQuickFlows();
    renderFramework();
    renderReviewTools();
    renderPersonas();
    renderModules();
    renderScripts();
    renderToolbox();
    renderRawManual();
    search.addEventListener('input', filterManual);

    const observer = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) setActiveModule(active.target.dataset.moduleId);
    }, { rootMargin: '-20% 0px -70% 0px', threshold: [0.1, 0.4, 0.8] });
    document.querySelectorAll('[data-module-id]').forEach((card) => observer.observe(card));
    setActiveModule(manual.modules[0].id);
  </script>
</body>
</html>
`;

fs.writeFileSync(outputFile, html, 'utf8');
console.log(`Wrote ${outputFile}`);
