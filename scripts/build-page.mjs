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
    title: '驿站主市场服务123456（4.0）250903',
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
    path: 'C:/Users/Administrator/.codex/attachments/a94350ec-194f-422e-bbd4-e8ff21cae1ed/pasted-text.txt'
  },
  {
    title: '《7幸福训练营》复制标准流程',
    path: 'C:/Users/Administrator/.codex/attachments/1f71a84b-c7b3-4a62-a604-96ffdcb442dd/pasted-text.txt'
  }
];

const sources = sourceFiles.map((source) => ({
  title: source.title,
  content: fs.existsSync(source.path)
    ? fs.readFileSync(source.path, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    : ''
}));

function sliceByHeadings(content, startText, endText) {
  const start = content.indexOf(startText);
  if (start < 0) return '';
  const end = endText ? content.indexOf(endText, start + startText.length) : -1;
  return content.slice(start, end > start ? end : undefined).trim();
}

function joinRawParts(parts) {
  return parts.map((part) => String(part || '').trim()).filter(Boolean).join('\n\n');
}

const marketManualText = sources[0]?.content || '';
const campManualText = sources[1]?.content || '';
const rawMirrorSources = [
  {
    id: 'rawSalon',
    title: '沙龙模块',
    tone: 'salon',
    content: sliceByHeadings(marketManualText, '一、沙龙模块', '二、7天幸福训练营')
  },
  {
    id: 'rawCamp7',
    title: '7天训练营模块',
    tone: 'camp',
    content: joinRawParts([
      sliceByHeadings(marketManualText, '二、7天幸福训练营', '三、幸福早课人才培养营'),
      campManualText
    ])
  },
  {
    id: 'rawTalent',
    title: '幸福早课人才培养营模块',
    tone: 'talent',
    content: sliceByHeadings(marketManualText, '三、幸福早课人才培养营', '四、榜样选拔与教练招募')
  },
  {
    id: 'rawOther',
    title: '榜样选拔与教练招募',
    tone: 'other',
    content: sliceByHeadings(marketManualText, '四、榜样选拔与教练招募')
  }
];

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
    standard: '你这个问题啊，其实很简单。先参加一个免费幸福沙龙，你自己都能找到原因，自己解决。',
    keywords: '孩子不听话 孩子问题 亲子教育 夫妻吵架 家庭问题 关系问题 心态问题 焦虑 不自律 叛逆'
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
    standard: '沙龙后必须闭环：不只是结束活动，而是让学员带着行动进入下一步。',
    keywords: '作业 复盘 反馈 没有反馈 下一步 7天训练营 沙龙结束'
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
    title: '一个服务理念 / 一类角色定位',
    body: '一个服务理念：扶正祛邪，与人相处最高境界就是去激发人的善意，把负能量转换成正能量，才能创造幸福力量。一类角色定位：你是幸福导游员，不创造景区，不剧透，只带领进入景区，让学员身临其境体验，自己感受美好；你是受益分享者，不传授知识，只引导帮助找到问题，始终激活学习心态，与学员共同成长。'
  },
  {
    number: '2',
    title: '两个沟通心法 / 两种开拓方法',
    body: '两个沟通心法：发问转念，点评引导顾客的注意力在自己身上；发问做选择题，用标准规律帮助学员做选择题，引导学员进入系统学习。两种开拓方法：一对一标准沟通；线上、线下沙龙。'
  },
  {
    number: '3',
    title: '三个必做目标 / 三大核心关注',
    body: '帮助目标：每天帮助3-5个人，实现1人进入私域。服务目标：每天沟通付费学员1-3个人，每3天筛选成长变化榜样1人。学习目标：每天查漏补缺，基础技能精通与实战。三大核心关注：关注成长，成功自然出现；关注过程，结果自然出现；关注行动，效果自然出现。'
  },
  {
    number: '4',
    title: '四步流程 / 人才漏斗',
    body: '四步服务流程：进人-直播、沙龙；留人-内容工具与情感服务；育人-付费学习；转人-转介绍、转合作。四阶人才漏斗：粉丝、客户、优质客户、合作伙伴。四种人才特征：特种兵、普通兵、潜水兵、逃兵，思考成为哪一种兵收获成长最快。四步个人服务步骤：检测-幸福自检表，问题可视化；诊断-一正一反对比，问出核心点，顾客知错；方案-基础群、公益课、专栏、研学班等不同阶段提高免疫力；陪伴-关系和成绩双提高，接幸福回家。'
  },
  {
    number: '5',
    title: '五步标准沟通 / 五步人才培养',
    body: '五步标准沟通：破冰，让人好奇想找你；原理，通过课程、一分钟、互动游戏、故事、榜样案例等找到正确方向；堵门，用选择题和转念只能选一条路；下危机，用故事或案例说明持续发展的后果；闭环，用发问和做选择题引导进入学习，彻底解决问题。五步人才培养：激活、排队、筛选、培养、裂变。'
  },
  {
    number: '6',
    title: '六个销售武器',
    body: '精通产品：精通10条每日一分钟、五堂课、产品核心优势与卖点。销售问题：常见问题问答库，包括价格、时间、信任等。主线提问：始终记得主要任务是让学员进入学习，把注意力引导到真正问题上。销售流程：四步服务流程。案例榜样：5个市场服务经典榜样、5个学习成果经典榜样。工具宝库：视频号、公众号、鸡腿群、钉钉内容群、公益课、专栏课程、一分钟宝典、智慧父母系列公益课等。'
  },
  {
    number: '7',
    title: '共同约定 / 收学员标准',
    body: '无论一对一、直播还是沙龙，核心目的都是用转念和做选择题帮助学员进入学习。想尽一切办法帮助学员进入系统学习，从中自我感悟、知错、内观、行动，才是使命的唯一途径。三种学员不收：家人反对坚决不收；有经济负担不收；不愿意学习成长、只想坐享其成、有搞定别人心态的人不收。只收一种学员：愿意为自己和家人的幸福负责，下定决心成长改变，愿意突破，为三代人的幸福打基础的人。'
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
  '是否发现榜样：不管是沙龙还是7天训练营，搜集来的榜样都统一进入一个大群，等待被采访。',
  '是否复盘自己：效果不好先找教练和流程问题，不找客户原因。'
];

const directorThinking = [
  {
    title: '角色共识',
    body: '所有人的角色都是受益分享者，不是老师，不是导师，不是大师。总监干三件事：育人才、挖沙子、淘金子；驿站主干两件事：挖沙子、淘金子。'
  },
  {
    title: '共同做四件事',
    body: '用锄头：用点评、音频、视频、文字、图片等激活别人，也激活自己。挖沙子：用沙龙育人，也育自己，严格按照标准通关、操作、复盘。造筛子：按照标准发掘榜样，用榜样工具激活更多人行动。淘金子：用行动筛选，任何发出的要求都要有收回动作。'
  },
  {
    title: '总监育人才三步',
    body: '前10次约人由总监完成，让筛选出来的伙伴讲，破除邀约恐惧；要求把人讲死，不是讲活，破除担心讲坏的恐惧；讲完用标准复盘，破除随意修改流程标准的行为。'
  },
  {
    title: '幸福事业五步',
    body: '榜样工具邀约来人，幸福沙龙挖沙子淘金子，幸福转念训练营继续筛选，进入平台学习，梦想合并并重复前面三步。'
  },
  {
    title: '伙伴求助的两个辅导',
    body: '先调心态：相信流程是在激活人的善，心态对了才会行动。再问细节：用方向和流程标准复盘具体动作，问怎么做、做了多少次、对方怎么反应，最后定计划、提要求、收反馈。'
  },
  {
    title: '顾客学习前四个顾虑',
    body: '听不懂、学不会、没效果、副作用。对应解决方式是沙龙体验、榜样案例、真实细节变化、观察关系是否越来越好以及身边人是否反馈自己变好了。'
  },
  {
    title: '学习后五种效果',
    body: '问题不再恶化、问题解决、其他问题解决、掌握能力、合并梦想。任何学员面前只有三条路：放任不管、自己摸索、进入环境持续学习持续改变。'
  }
];

const flowGuide = [
  {
    title: '破冰 / 转介绍',
    targetId: 'quickFlows',
    standard: '通过破冰或转介绍让有真实幸福需求的人愿意靠近，先问问题，不急着讲知识。',
    next: '进入需求承接',
    source: '查原文话术库',
    keywords: '孩子不听话 孩子问题 亲子教育 夫妻吵架 家庭问题 关系问题 心态问题 焦虑'
  },
  {
    title: '需求承接',
    targetId: 'module-scripts',
    standard: '不陷入咨询分析，用固定话术承接：这个问题其实很简单，进入免费幸福沙龙，自己找到原因、自己解决。',
    next: '转到免费幸福沙龙',
    source: '查承接话术',
    keywords: '承接 咨询 问题 免费幸福沙龙 你这个问题啊 其实很简单'
  },
  {
    title: '免费幸福沙龙',
    targetId: 'module-salon',
    standard: '严格按照邀约、讲发心、热场、提要求、主题、分享、引导式采访、心愿闭环执行。',
    next: '让顾客在沙龙里知错',
    source: '查8步标准'
  },
  {
    title: '沙龙让顾客知错',
    targetId: 'salonReview',
    standard: '通过体验、发问、点评、作业，让顾客把注意力回到自己身上，看到自己的错误和行动方向。',
    next: '沙龙后承接',
    source: '查沙龙复盘',
    keywords: '知错 转念 点评 作业 复盘 收作业 反馈 沙龙结束 下一步'
  },
  {
    title: '沙龙后承接',
    targetId: 'module-homework',
    standard: '询问还有哪些问题，用固定话术承接7天训练营，布置作业、收作业、收反馈。',
    next: '进入7天训练营持续内观行动',
    source: '查作业与复盘'
  },
  {
    title: '7天训练营持续内观行动',
    targetId: 'module-camp7',
    standard: '每天提要求、主题训练、作业实践、反馈调整，让学员自己看见错误并决定行动。',
    next: '进入系统学习环境',
    source: '查7天课程展开'
  },
  {
    title: '进入系统学习环境',
    targetId: 'module-talent',
    standard: '让学员明白一天的学习不能解决一辈子的问题，必须进入环境，持续学习、持续改变。',
    next: '掌握一辈子幸福能力',
    source: '查幸福早课人才培养营'
  },
  {
    title: '掌握一辈子幸福能力',
    targetId: 'module-talent',
    standard: '在持续学习和行动反馈里掌握处理关系、沟通、情绪和家庭问题的能力。',
    next: '进入人才培养营',
    source: '查人才培养标准'
  },
  {
    title: '人才培养营',
    targetId: 'module-talent',
    standard: '筛选受益、行动、愿意帮助别人的人，进入系统成长，学习复制标准。',
    next: '成为合作伙伴',
    source: '查人才培养营'
  },
  {
    title: '合作伙伴',
    targetId: 'module-coach',
    standard: '从受益学员到榜样，再到教练和合作伙伴，严格复制流程，帮助更多家庭。',
    next: '回到流程地图复盘',
    source: '查教练招募与严格复制'
  }
];

const masterFlow = [
  {
    number: '01',
    title: '来人先承接',
    tag: '破冰 / 转介绍 / 直播间粉丝',
    goal: '不管人是破冰来的、转介绍来的，还是直播间来的粉丝，第一件事不是讲一堆知识，而是通过简单沟通了解他需要解决什么问题。',
    process: [
      '简单沟通，先了解他需要解决什么问题。',
      '不分析、不安慰、不证明自己懂，不急着给答案。',
      '统一用万能话术承接。',
      '把下一步引到免费幸福沙龙。'
    ],
    standards: [
      '先问清楚：孩子问题、家庭问题、关系问题、心态问题，还是其他幸福问题。',
      '不要陷入分析，不急着证明自己懂，不急着给答案。',
      '统一用万能话术承接，把人引到免费幸福沙龙。'
    ],
    script: [
      '你这个问题啊，其实很简单。',
      '参加一个免费幸福沙龙，你自己都能找到原因，自己解决。',
      '你看你如果愿意，我通知你参加。'
    ],
    review: [
      '有没有先了解对方到底要解决什么问题？',
      '有没有用固定话术承接，而不是自己发挥？',
      '有没有把下一步明确引到免费幸福沙龙？'
    ],
    source: '对应能力：原文话术库、场景入口、幸福自检表。'
  },
  {
    number: '02',
    title: '免费幸福沙龙',
    tag: '用沙龙让顾客知错',
    goal: '沙龙不是讲知识炫能力，而是用体验、发问、点评、作业，让顾客把注意力回到自己身上，自己看见问题。',
    process: [
      '邀约。',
      '讲发心。',
      '热场。',
      '提要求。',
      '主题。',
      '分享。',
      '引导式采访。',
      '心愿闭环。',
      '留作业、收作业。',
      '发现榜样，统一进群，等待被采访。'
    ],
    standards: [
      '严格按照邀约、讲发心、热场、提要求、主题、分享、引导式采访、心愿闭环执行。',
      '一场沙龙只讲一个主题，难度越小、内容越少，越容易复制。',
      '沙龙结束必须留作业、收作业，有结果就继续承接，没有结果就复盘教练和流程。',
      '突破成长的榜样统一进一个群，接受榜样采访，进行激活。'
    ],
    script: [
      '今天这场学习有没有帮到大家？',
      '学起来是不是特别的简单？有没有一种恍然大悟的感觉？',
      '像这样简单易学的内容，我们有很多，每一次的学习都解决一个问题。',
      '你看你如果愿意继续学习的话，下一场沙龙我再通知您。'
    ],
    review: [
      '有没有按 8 步标准流程走完整？',
      '有没有让顾客参与，而不是旁听？',
      '有没有布置作业并约定提交时间？'
    ],
    original: [
      '若想最高效服务出效果，开沙龙的人必须严格按照以下标准：',
      '心态标准：',
      '1.只服务有真实幸福需求的人，不接受自称“完全幸福”的学员，用案例激活或幸福自检表让对号入座。',
      '2.遇到抗拒态度人员直接淘汰，不浪费时间。',
      '3.我们的态度决定学员态度，立好标准就不会被消耗。',
      '动作标准：',
      '1.一个开沙龙的人一场沙龙只带2人，两个都是顾客，不允许旁听，只能参与。',
      '2.陌生人沙龙结束后面对面建群，方便留作业、收作业、通知下次沙龙；教练也要完成作业，并提交。',
      '3.转介绍客户可以直接进7天幸福训练营。',
      '4.教练没有完成作业，取消教练资格。',
      '5.如果顾客因为实际问题，允许请假，做到有温度，人性化。',
      '6.随时随地及时发现榜样，推荐榜样，这个是每一个开沙龙的人的能力。',
      '7.每个人开沙龙的人，必须要准备自己的发心故事，并完整通关。',
      '8.作业交付：明确到具体时间点；回家不愿意给家人表达的顾客，要了解清楚原因，给1次机会，仍然拒绝给家人表达的，就取消1年学习资格。',
      '9.突破成长的榜样在一个群，接受榜样采访，进行激活。',
      '10.留作业、收作业标准。',
      '交作业的标准',
      '你今天你给哪一个家人表达了，在哪一个场景下用的？',
      '你当时说了一段什么样的话，你的家人给了你什么样的一个反应或者反馈？',
      '你又是什么样的心情？',
      '提交方式：文字语音不限作业。',
      '提交时间：明天上午8点钟之前。',
      '复制标准：',
      '1.严格按照8步标准流程。',
      '2.复制核心原则：难度越小、内容越少，越容易推广复制。',
      '3.市场验证成熟有效，个人不能修改标准；如果在市场中某个点上验证了有共性卡点问题，统一升级标准。',
      '4.每天给开沙龙的人通关，确认对流程清晰，对内容理解，做到完全正确复制，不敷衍，不放水，不能通关一次，管好几天，拒绝学习型只学不做的沙龙，拒绝我想着……我以为……我觉得……',
      '5.只要是沙龙标准流程里面没有的，不要说，不要做。'
    ],
    source: '对应能力：沙龙模块、沙龙后复盘、工具与模型。'
  },
  {
    number: '03',
    title: '7天幸福训练营',
    tag: '沙龙筛选导入',
    goal: '沙龙筛选出来有学习态度、有受益、有行动的人，进入 7 天训练营，持续内观、行动、反馈。',
    process: [
      '沙龙或者转介绍筛选导入。',
      '一个教练带2个顾客，不能混营。',
      '每天课程前通关。',
      '每天提要求。',
      '每天主题训练。',
      '每天留作业、收作业。',
      '有突破榜样，统一进群，等待被采访。',
      '每天复盘反馈。'
    ],
    standards: [
      '7天训练营的顾客从沙龙或者转介绍来，不用邀约破冰。',
      '一个教练带2个顾客，就是一个幸福训练营，不能混营。',
      '每天提要求、做主题训练、留作业、收作业、复盘反馈。',
      '建立榜样群，有突破的榜样及时进群，所有榜样都在一个群，等待被采访。'
    ],
    script: [
      '大家想早一天解决问题，还是晚一天解决问题？',
      '大家想早一天幸福，还是晚一天幸福？',
      '最好的办法就是一定要按照标准参与。',
      '看别人炒菜和自己动手炒菜，谁学会的更快？'
    ],
    review: [
      '学员有没有按要求全程参与？',
      '作业有没有具体到人、场景、说了什么、反馈是什么？',
      '效果不理想时，有没有第一时间复盘流程和教练问题？'
    ],
    original: [
      '若想最高效服务出效果，负责人必须严格按照以下标准：',
      '心态标准：',
      '1.7天训练营的顾客是从沙龙或者转介绍来的，不用邀约破冰。',
      '2.真知错的学员，当天就能完成作业；假知错的学员，一定会拖延，完不成作业。',
      '3.不配合、不按要求实践的学员，后面再给一次机会下次再参加，2次都不合格者，取消1年内学习资格。',
      '动作标准：',
      '1.一个教练带2个顾客，就是一个幸福训练营，一天可以错开开设多个营，不混合开班。',
      '2.转介绍的顾客，可以直接参加幸福训练营。',
      '3.7天幸福训练营受益通过审核的榜样学员，可带沙龙和7天幸福训练营，但不能带21天。',
      '4.每天课程之前必须要通关，强化幸福能力交付，保证幸福教练掌握正确的标准。',
      '5.随时随地及时发现榜样，推荐榜样。',
      '6.每个人训练营的人，必须要准备自己的发心故事，并完整通关。',
      '7.突破成长的榜样在一个群，接受榜样采访，进行激活。',
      '学习要求：',
      '1.全程开视频。',
      '2.每天提前5分进会议室。',
      '作业要求：',
      '1.留作业、收作业。',
      '2.交作业的标准',
      '3.你今天你给哪一个家人表达了，在哪一个场景下用的？',
      '4.你当时说了一段什么样的话，你的家人给了你什么样的一个反应或者反馈？',
      '5.你又是什么样的心情？',
      '6.提交方式：文字语音不限作业。',
      '7.提交时间：明天上午8点钟之前。',
      '复制标准：',
      '1.建立榜样群，有突破的榜样及时进群，所有的榜样都在一个群，等待被采访。',
      '2.通过审核成为幸福教练的，建立幸福教练群，所有幸福教练在一个群。',
      '3.有事允许请假，人性化管理，放下一期就好了，但是连着两期学习态度不端正，取消学习资格，删除拉黑微信避免被消耗。'
    ],
    source: '对应能力：7天幸福训练营、7天课程展开、作业与复盘。'
  },
  {
    number: '04',
    title: '系统学习',
    tag: '掌握一辈子幸福能力',
    goal: '7天训练营筛选出真正愿意改变的人，进入系统学习环境，持续学习，持续改变，掌握一辈子幸福的能力。',
    process: [
      '确认学员是自己愿意继续学习。',
      '讲清楚持续学习、持续改变的必要性。',
      '坚持三种学员不收，只收一种学员。',
      '进入系统学习环境，掌握一辈子幸福能力。'
    ],
    standards: [
      '让学员明白：一天的学习不能解决一辈子的问题。',
      '进入一个环境，持续学习，持续改变，越来越好。',
      '只收愿意为自己和家人的幸福负责、下定决心成长改变的人。'
    ],
    script: [
      '一天的学习不能解决一辈子的问题。',
      '只有持续学习，才不会让生活过得一地鸡毛。',
      '进入一个环境，持续学习，持续改变，越来越好。'
    ],
    review: [
      '学员是自己愿意继续学习，还是被推着走？',
      '有没有讲清楚持续学习和持续行动的重要性？',
      '有没有坚持三种学员不收，只收一种学员？'
    ],
    source: '对应能力：市场服务模型、三种学员不收、只收一种学员。'
  },
  {
    number: '05',
    title: '合作伙伴',
    tag: '参与幸福驿站事业',
    goal: '从受益学员、榜样、教练中筛选愿意帮助别人、愿意严格复制流程的人，参与幸福驿站事业。',
    process: [
      '从受益学员、榜样、教练中观察行动。',
      '看是否愿意帮助别人。',
      '看家人支持、时间精力和执行标准。',
      '按流程复盘，进入合作伙伴路径。'
    ],
    standards: [
      '合作伙伴不是看热情，而是看受益、行动、家人支持、时间精力和严格执行流程。',
      '所有人的角色都是受益分享者，不是老师，不是导师，不是大师。',
      '核心是用转念和做选择题帮助学员进入学习，从中自我感悟、知错、内观、行动。'
    ],
    script: [
      '我们不是推销东西，是帮助更多家庭少走弯路。',
      '自己拿到幸福以后，再用标准流程帮助别人接幸福回家。',
      '标准里面没有的，不要说，不要做。'
    ],
    review: [
      '这个人是不是受益者？',
      '有没有行动反馈和帮助别人的意愿？',
      '能不能严格执行流程，不随意发挥？'
    ],
    source: '对应能力：总监思维与认识、教练招募与严格复制、共同约定。'
  },
  {
    number: '06',
    title: '幸福早课人才培养营',
    tag: '人才进入系统成长',
    goal: '把筛选出来的人才继续放到训练环境里，先交付幸福能力，再交付健康管理能力，让人才在系统中成长。',
    process: [
      '7天毕业且满足要求，才能升级进入。',
      '单营不超过10人，可同时开多个营，不能混营。',
      '实行一人一课。',
      '每天预习通关。',
      '每天完成作业并提交。',
      '每天反馈复盘。'
    ],
    standards: [
      '7天毕业且满足要求的学员，才能升级进入幸福早课人才培养营。',
      '单营人数不超过10人，可同时开设多个营，不能混营。',
      '实行一人一课制度，每位讲师只负责讲1堂课，每天必须完成作业并提交。'
    ],
    script: [
      '我们先把幸福能力练扎实，再进入更系统的成长。',
      '所有人都按照标准参与，教练也要完成作业。',
      '通一节、练一节、反馈一节。'
    ],
    review: [
      '是否符合升级条件？',
      '是否按一人一课和单营人数标准执行？',
      '是否每天通关、每天作业、每天反馈？'
    ],
    source: '对应能力：幸福早课人才培养营、人才培养标准。'
  }
];

const modelCollection = {
  title: '榜样采集标准与流程',
  steps: [
    {
      title: '共情，激活分享人',
      body: '可以是类似语言的点评：听到你的故事，能感受到你是一个有责任心的人，一直在找幸福的方法；你的故事之前听过，能感受到过去受了很多委屈，现在也找到了真正的解决办法；能看到你现在状态，为你高兴，你这一路走来肯定吃了不少苦头。',
      purpose: '核心目的是用具体的场景引导带入情感。'
    },
    {
      title: '分享，自由分享',
      body: '大概思路可以围绕：学员遇到什么问题，想了什么办法，一路的坎坷，怎么在大春平台具体学习改变，下一步的计划。中间需要挖掘细节的，可以继续发问：当时是怎么发生的？当时你心理是怎么想的？当时对方啥反应，说了啥，做了啥？',
      purpose: '核心目的是按照时间发展顺序，学员可以回忆起来细节，充满感情地表达所发生的事情。'
    },
    {
      title: '补充，查漏补缺',
      body: '根据17个问题进行补充发问。',
      purpose: '核心目的是一次性采集完整。'
    },
    {
      title: '采访过程中对于榜样的回应激活方式是点评',
      body: '点评的结构：\n1）顾客过去没做到，意识到错误，点出苦衷和辛苦\n2）顾客现在做到，点出努力和收获\n3）顾客未来可能做到，点出自信和可能\n\n点评的七个角度：\n第一，点评对方外在\n第二，点评能力优秀\n第三，点评前后变化\n第四，点评对方给你的真实感受\n第五，点评对方的辛苦\n第六，点评自己向对方学到什么\n第七，点评人品和人格魅力',
      purpose: '核心目的用点评激活顾客。'
    }
  ],
  questions: [
    '你当时是带着什么问题来的？',
    '达到了什么程度？',
    '你那时候的心情是怎么样？',
    '曾经发生的最严重的，让你记忆最深刻的一件事儿是什么事儿？可以分享一个吗？',
    '发生矛盾之后你是怎么解决的？都用了哪些方法？如果是学习过的人，可以问他们花了多少钱。效果怎么样？',
    '你在学习第几天的时候，家里开始改变的？',
    '当时是在什么场景下给家人用的？说了些什么话？',
    '你当时是怀着什么心情给家人表达的？',
    '表达完家人是什么反应，或者给了你什么反馈？',
    '如果你到现在没学到这样的内容，你家里会变成什么样？',
    '这个结果是你想要的吗？',
    '通过学习你知道之前哪些地方做的不对？',
    '接下来咱们如果想持续幸福，那正确的做法该怎么做？',
    '今天你通过学习，拿到了自己的幸福，有没有一些心里话，对直播间其他有同样家庭烦恼的家人们说两句？',
    '你身边跟咱们没学习之前一样，家里鸡飞狗跳，孩子不听话，家人之间无法沟通的家庭多不多？如果让你给他们说一段话，你会说什么？',
    '你拿到幸福以后，你愿意把你的经历分享出来，去帮助他们从家庭内耗的泥潭里摆脱出来吗？',
    '如果有时间，有精力的情况下，你愿意加入到幸福教练的行列里，跟我们一样帮助更多人吗？'
  ]
};

const toolbox = [
  {
    title: '驿站主市场服务123456参考图',
    image: 'assets/market-service-123456.png',
    text: '图片保留原参考图，页面上方“市场服务1234567”已按4.0文字内容更新。'
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

const camp7Review = [
  '学员是不是从沙龙或者转介绍筛选来的？有没有跳过筛选？',
  '是不是一个教练带2个顾客？有没有混营？',
  '每天课程之前有没有通关？教练是否掌握正确标准？',
  '学员有没有全程开视频、提前进会议室、按要求参与？',
  '作业有没有按时提交？是否具体到对象、场景、原话、反馈和心情？',
  '不配合、不按要求实践的学员有没有按标准处理？',
  '沙龙和7天训练营搜集来的榜样，是否统一进入一个大群，等待被采访？'
];

function stripMarkdownText(value) {
  return String(value || '')
    .replace(/\r/g, '')
    .trim()
    .replace(/^\s*>\s*/, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function isMarkdownHeading(line, level, title) {
  return String(line || '').trim() === `${'#'.repeat(level)} ${title}`;
}

function splitMarkdownSections(lines, level) {
  const marker = '#'.repeat(level);
  const sections = [];
  let current = null;
  lines.forEach((line) => {
    const text = String(line || '').trim();
    if (text.startsWith(marker + ' ') && !text.startsWith(marker + '#')) {
      if (current) sections.push(current);
      current = { title: stripMarkdownText(text.slice(level).trim()), lines: [] };
      return;
    }
    if (current) current.lines.push(line);
  });
  if (current) sections.push(current);
  return sections;
}

function getMarkdownRange(lines, startTitle, endTitle) {
  const start = lines.findIndex((line) => isMarkdownHeading(line, 1, startTitle));
  if (start < 0) return [];
  const end = endTitle
    ? lines.findIndex((line, index) => index > start && isMarkdownHeading(line, 1, endTitle))
    : -1;
  return lines.slice(start + 1, end > start ? end : undefined);
}

function parseMarkdownList(lines, { keepMarkers = false } = {}) {
  const items = [];
  lines.forEach((line) => {
    const text = stripMarkdownText(line);
    if (!text || text === '---') return;
    const ordered = text.match(/^([0-9]{1,3}[.、）)]|[一二三四五六七八九十]+[、）)]|第[0-9一二三四五六七八九十]+[天步])\s*(.+)$/);
    if (ordered) {
      items.push(keepMarkers ? text : ordered[2].trim());
      return;
    }
    const bullet = text.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      items.push(keepMarkers ? `* ${bullet[1].trim()}` : bullet[1].trim());
      return;
    }
    items.push(text);
  });
  return items;
}

function parseStageMarkdown(section, fallback) {
  const titleMatch = section.title.match(/^([0-9]{1,2})[.、]\s*(.+)$/);
  const stage = { ...fallback };
  if (titleMatch) {
    stage.number = titleMatch[1];
    stage.title = titleMatch[2].trim();
  }

  const subSections = splitMarkdownSections(section.lines, 3);
  const beforeFirstSub = section.lines.slice(0, section.lines.findIndex((line) => String(line || '').trim().startsWith('### ')) > -1
    ? section.lines.findIndex((line) => String(line || '').trim().startsWith('### '))
    : section.lines.length);
  beforeFirstSub.forEach((line) => {
    const text = stripMarkdownText(line);
    const meta = text.match(/^(入口\/定位|目标|查找来源)：\s*(.*)$/);
    if (!meta) return;
    if (meta[1] === '入口/定位') stage.tag = meta[2].trim();
    if (meta[1] === '目标') stage.goal = meta[2].trim();
    if (meta[1] === '查找来源') stage.source = meta[2].trim();
  });

  const sectionMap = new Map(subSections.map((item) => [item.title, item.lines]));
  if (sectionMap.has('流程步骤')) stage.process = parseMarkdownList(sectionMap.get('流程步骤'));
  if (sectionMap.has('执行标准')) stage.standards = parseMarkdownList(sectionMap.get('执行标准'));
  if (sectionMap.has('话术原文')) stage.script = parseMarkdownList(sectionMap.get('话术原文'), { keepMarkers: true });
  if (sectionMap.has('复盘问题')) stage.review = parseMarkdownList(sectionMap.get('复盘问题'));
  if (sectionMap.has('标准原文')) stage.original = parseMarkdownList(sectionMap.get('标准原文'), { keepMarkers: true });
  return stage;
}

function parseModelCollectionMarkdown(lines, fallback) {
  const sections = splitMarkdownSections(lines, 3);
  const steps = [];
  let questions = fallback.questions || [];
  sections.forEach((section) => {
    if (section.title === '榜样采访问句模板') {
      questions = parseMarkdownList(section.lines);
      return;
    }
    const titleMatch = section.title.match(/^[0-9]{1,2}[.、]\s*(.+)$/);
    const bodyLines = [];
    let purpose = '';
    section.lines.forEach((line) => {
      const text = stripMarkdownText(line);
      if (!text) return;
      const purposeMatch = text.match(/^核心目的：\s*(.+)$/);
      if (purposeMatch) purpose = purposeMatch[1].trim();
      else bodyLines.push(text);
    });
    steps.push({
      title: titleMatch ? titleMatch[1].trim() : section.title,
      body: bodyLines.join('\n'),
      purpose
    });
  });
  return {
    ...fallback,
    steps: steps.length ? steps : fallback.steps,
    questions
  };
}

function parseFrameworkMarkdown(lines, fallback, numbered = true) {
  const sections = splitMarkdownSections(lines, 3);
  const parsed = sections.map((section, index) => {
    const titleMatch = section.title.match(/^([0-9]{1,2})[.、]\s*(.+)$/);
    return {
      number: titleMatch ? titleMatch[1] : String(index + 1),
      title: titleMatch ? titleMatch[2].trim() : section.title,
      body: parseMarkdownList(section.lines, { keepMarkers: true }).join('\n')
    };
  });
  if (!numbered) {
    return parsed.map(({ title, body }) => ({ title, body }));
  }
  return parsed.length ? parsed : fallback;
}

function parseRawMarkdownSources(lines, fallback) {
  const sections = splitMarkdownSections(lines, 2);
  return fallback.map((source) => {
    const section = sections.find((item) => item.title === source.title);
    if (!section) return source;
    return {
      ...source,
      content: parseMarkdownList(section.lines, { keepMarkers: true }).join('\n')
    };
  });
}

function applyMarkdownOverrides(baseData) {
  const markdownFile = path.join(repoRoot, 'exports', 'market-service-manual.md');
  if (!fs.existsSync(markdownFile)) return baseData;
  const markdownLines = fs.readFileSync(markdownFile, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  const flowRange = getMarkdownRange(markdownLines, '大流程｜从陌生人到合作伙伴', '镜子库｜用流程标准照镜子');
  const flowSections = splitMarkdownSections(flowRange, 2);
  const flowByNumber = new Map(flowSections.map((section) => {
    const match = section.title.match(/^([0-9]{1,2})[.、]/);
    return [match ? match[1] : section.title, section];
  }));
  const nextMasterFlow = baseData.masterFlow.map((stage) => {
    const section = flowByNumber.get(stage.number);
    return section ? parseStageMarkdown(section, stage) : stage;
  });

  const mirrorRange = getMarkdownRange(markdownLines, '镜子库｜用流程标准照镜子', '原文模块');
  const mirrorSections = splitMarkdownSections(mirrorRange, 2);
  const mirrorMap = new Map(mirrorSections.map((section) => [section.title, section.lines]));

  const rawRange = getMarkdownRange(markdownLines, '原文模块');

  return {
    ...baseData,
    masterFlow: nextMasterFlow,
    salonReview: mirrorMap.has('沙龙复盘') ? parseMarkdownList(mirrorMap.get('沙龙复盘')) : baseData.salonReview,
    camp7Review: mirrorMap.has('7天训练营复盘') ? parseMarkdownList(mirrorMap.get('7天训练营复盘')) : baseData.camp7Review,
    modelCollection: mirrorMap.has('榜样采访') ? parseModelCollectionMarkdown(mirrorMap.get('榜样采访'), baseData.modelCollection) : baseData.modelCollection,
    serviceFramework: mirrorMap.has('市场服务') ? parseFrameworkMarkdown(mirrorMap.get('市场服务'), baseData.serviceFramework) : baseData.serviceFramework,
    directorThinking: mirrorMap.has('总监思维') ? parseFrameworkMarkdown(mirrorMap.get('总监思维'), baseData.directorThinking, false) : baseData.directorThinking,
    rawMirrorSources: rawRange.length ? parseRawMarkdownSources(rawRange, baseData.rawMirrorSources) : baseData.rawMirrorSources
  };
}

const data = applyMarkdownOverrides({ modules, scriptLibrary, sources, rawMirrorSources, quickFlows, serviceFramework, directorThinking, salonReview, camp7Review, flowGuide, masterFlow, modelCollection, toolbox });

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
  <title>幸福学院市场服务手册</title>
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
      padding: 28px 0 22px;
      text-align: center;
    }
    .hero-mini-logo {
      width: min(172px, 46vw);
      height: auto;
      display: block;
      margin: 0 auto 14px;
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
      font-size: clamp(34px, 6vw, 62px);
      line-height: 1.04;
      letter-spacing: 0;
    }
    .hero-copy {
      max-width: 820px;
      margin: 12px auto 0;
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
      gap: 18px;
      align-items: start;
    }
    .page-shell {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto 56px;
    }
    .workspace-tabs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 12px;
      padding: 6px;
      border-radius: 18px;
      background: #f5f5f7;
    }
    .workspace-tabs button {
      min-width: 0;
      border: 0;
      border-radius: 14px;
      padding: 12px 10px;
      background: transparent;
      color: #3a3a3c;
      font-weight: 900;
      line-height: 1.25;
      cursor: pointer;
    }
    .workspace-tabs button.active {
      color: #fff;
      background: linear-gradient(135deg, #0071e3, #40a6ff);
      box-shadow: 0 10px 24px rgba(0,113,227,.20);
    }
    .workspace-panel[hidden] {
      display: none !important;
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
    .map-title {
      padding: 0 4px;
      color: #6e6e73;
      font-size: 12px;
      font-weight: 900;
    }
    .content {
      min-width: 0;
      display: grid;
      gap: 16px;
    }
    .required-master-flow {
      background: rgba(255,255,255,.86);
    }
    .main-flow-tabs {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 8px;
      margin-top: 22px;
      padding: 8px;
      border-radius: 20px;
      background: #f5f5f7;
    }
    .main-flow-tabs button {
      min-width: 0;
      border: 0;
      border-radius: 14px;
      background: transparent;
      color: #3a3a3c;
      padding: 12px 8px;
      font-weight: 850;
      cursor: pointer;
      line-height: 1.25;
      transition: background .18s ease, color .18s ease, box-shadow .18s ease;
    }
    .main-flow-tabs button.active {
      color: #fff;
      background: linear-gradient(135deg, #0071e3, #40a6ff);
      box-shadow: 0 10px 24px rgba(0,113,227,.20);
    }
    .flow-stage-panel {
      margin-top: 16px;
    }
    .flow-stage-card {
      border-radius: 0;
      background: transparent;
      padding: 4px 0 0;
    }
    .stage-kicker {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      color: var(--muted);
      font-weight: 850;
      margin-bottom: 12px;
    }
    .stage-number {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: var(--blue);
      font-size: 13px;
    }
    .flow-stage-card h3 {
      margin: 0;
      font-size: clamp(28px, 4vw, 44px);
      line-height: 1.08;
    }
    .stage-goal {
      margin: 12px 0 0;
      color: #3a3a3c;
      font-size: 18px;
      line-height: 1.65;
      font-weight: 700;
    }
    .stage-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-top: 18px;
    }
    .stage-block {
      border-radius: 16px;
      background: #f7f7f8;
      padding: 15px;
    }
    .stage-block h4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0 0 10px;
      font-size: 16px;
    }
    .stage-block ul,
    .stage-block ol {
      margin: 0;
      padding-left: 20px;
      color: #2c2c2e;
      line-height: 1.68;
      font-weight: 680;
    }
    .stage-process {
      background: rgba(52,199,89,.10);
    }
    .stage-script {
      background: rgba(0,113,227,.08);
    }
    .stage-script p,
    .stage-source p {
      margin: 0;
      color: #1d1d1f;
      line-height: 1.72;
      font-weight: 760;
      white-space: pre-wrap;
    }
    .stage-source {
      grid-column: 1 / -1;
      background: rgba(245,245,247,.72);
    }
    .stage-original {
      grid-column: 1 / -1;
      background: rgba(245,245,247,.72);
    }
    .stage-original-intro {
      margin: 0 0 12px;
      color: #1d1d1f;
      line-height: 1.7;
      font-weight: 760;
    }
    .stage-original-groups {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .stage-original-group {
      min-width: 0;
      border-radius: 12px;
      background: #fff;
      padding: 12px;
    }
    .stage-original-group h5 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0 0 8px;
      font-size: 15px;
    }
    .stage-original-group ul,
    .stage-original-group ol,
    .stage-original-line-list {
      margin: 0;
      padding-left: 0;
    }
    .stage-original-line-list {
      display: grid;
      gap: 5px;
    }
    .mini-copy {
      flex: 0 0 auto;
      border: 0;
      border-radius: 999px;
      background: rgba(0,113,227,.10);
      color: var(--blue);
      font-size: 12px;
      line-height: 1;
      font-weight: 900;
      cursor: pointer;
    }
    .mini-copy {
      padding: 6px 8px;
    }
    .raw-copy-btn {
      align-self: center;
    }
    .content-tabs {
      display: flex;
      overflow-x: auto;
      gap: 8px;
      margin-top: 18px;
      padding-bottom: 2px;
      scrollbar-width: none;
    }
    .content-tabs::-webkit-scrollbar { display: none; }
    .content-tabs button {
      flex: 0 0 auto;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: #fff;
      color: #1d1d1f;
      padding: 9px 12px;
      font-size: 13px;
      font-weight: 850;
    }
    .content-tabs button.active {
      border-color: rgba(0,113,227,.35);
      background: rgba(0,113,227,.10);
      color: var(--blue);
    }
    .content-panel[hidden] {
      display: none !important;
    }
    .mirror-raw-panel {
      --mirror-tint: #f7f7f8;
      --mirror-accent: #0071e3;
    }
    .mirror-raw-head {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .mirror-raw-panel h3 {
      margin: 0;
      font-size: clamp(24px, 3.2vw, 34px);
      line-height: 1.15;
    }
    .raw-copy-list {
      display: grid;
      gap: 10px;
    }
    .raw-module-card {
      border-radius: 12px;
      padding: 10px;
      background: #fff;
      border: 1px solid rgba(0,0,0,.08);
      border-left: 3px solid var(--mirror-accent);
    }
    .raw-module-head {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: 8px;
      align-items: start;
      border-radius: 10px;
      padding: 8px 9px;
      background: var(--mirror-tint);
    }
    .raw-module-title {
      margin: 0;
      color: #1d1d1f;
      font-size: 15.5px;
      line-height: 1.45;
      font-weight: 950;
      background: var(--mirror-tint);
    }
    .raw-line-list {
      display: grid;
      gap: 5px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(0,0,0,.08);
    }
    .raw-line {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 8px;
      align-items: start;
      list-style: none;
    }
    .raw-order {
      min-width: 24px;
      color: var(--mirror-accent);
      font-size: 12px;
      font-weight: 950;
      line-height: 1.55;
      text-align: right;
    }
    .raw-order.empty {
      min-width: 0;
    }
    .raw-module-card strong {
      color: #1d1d1f;
      font-weight: 900;
    }
    .raw-line span:last-child,
    .raw-module-card > p {
      color: #3a3a3c;
      line-height: 1.56;
      font-size: 14px;
      font-weight: 600;
    }
    .raw-module-card > p {
      margin: 8px 0 0;
    }
    .tone-salon {
      --mirror-tint: rgba(52,199,89,.10);
      --mirror-accent: #34c759;
    }
    .tone-camp {
      --mirror-tint: rgba(0,113,227,.10);
      --mirror-accent: #0071e3;
    }
    .tone-talent {
      --mirror-tint: rgba(255,149,0,.13);
      --mirror-accent: #ff9500;
    }
    .tone-other {
      --mirror-tint: rgba(142,142,147,.14);
      --mirror-accent: #8e8e93;
    }
    .ability-two-col {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 18px;
    }
    .band {
      border-radius: 30px;
      border: 1px solid var(--line);
      background: var(--panel);
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    .legacy-section {
      display: none;
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
    .logic-card, .process-step, .flow-card, .framework-card {
      min-width: 0;
      border-radius: 16px;
      background: #f7f7f8;
      padding: 15px;
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
    .entry-grid, .framework-grid, .tool-grid, .guide-grid, .collection-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 18px;
    }
    .flow-card h3, .framework-card h3, .tool-card h3, .guide-card h3, .collection-card h3 {
      margin: 0 0 10px;
      font-size: 20px;
      line-height: 1.25;
    }
    .flow-card ol, .review-list, .question-list {
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
    .review-list li {
      margin: 10px 0;
      padding: 0 0 0 2px;
    }
    .question-list li {
      margin: 10px 0;
      border-radius: 12px;
      padding: 12px 14px;
      background: #f7f7f8;
    }
    .tool-card {
      min-width: 0;
      border-radius: 16px;
      background: #f7f7f8;
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
    .search-results {
      display: none;
      border-radius: 20px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.88);
      padding: 10px;
      box-shadow: 0 14px 40px rgba(0,0,0,.06);
    }
    .search-results.show { display: grid; gap: 8px; }
    .result-button {
      width: 100%;
      border: 0;
      border-radius: 14px;
      padding: 10px;
      background: #f5f5f7;
      color: #1d1d1f;
      text-align: left;
      font-size: 13px;
      font-weight: 800;
    }
    .result-button span {
      display: block;
      margin-bottom: 4px;
      color: var(--blue);
      font-size: 12px;
    }
    .guide-card, .collection-card, .question-card {
      min-width: 0;
      border-radius: 18px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.78);
      padding: 14px;
    }
    .compact-flow summary {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 10px;
      cursor: pointer;
      list-style: none;
    }
    .compact-flow summary::-webkit-details-marker { display: none; }
    .compact-flow[open] { background: #fff; }
    .flow-index {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: #111;
      font-weight: 900;
      font-size: 12px;
    }
    .compact-flow h3 { margin: 0 0 4px; }
    .compact-flow p { margin: 0; }
    .compact-body {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--line);
    }
    .guide-actions, .module-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }
    .small-action {
      border: 0;
      border-radius: 999px;
      padding: 8px 12px;
      background: rgba(0,113,227,.1);
      color: var(--blue);
      font-size: 13px;
      font-weight: 900;
      text-decoration: none;
    }
    .raw-layout {
      display: grid;
      grid-template-columns: 220px minmax(0, 1fr);
      gap: 14px;
      margin-top: 18px;
    }
    .raw-toc {
      position: sticky;
      top: 74px;
      display: grid;
      gap: 8px;
      align-self: start;
    }
    .raw-toc button {
      border: 0;
      border-radius: 14px;
      padding: 10px 12px;
      background: #f5f5f7;
      text-align: left;
      font-weight: 900;
    }
    .source-section {
      border-radius: 22px;
      border: 1px solid var(--line);
      background: #fff;
      margin-bottom: 12px;
      overflow: hidden;
    }
    .source-section summary {
      cursor: pointer;
      padding: 14px 16px;
      font-weight: 900;
      background: #f7f7f8;
    }
    .source-block {
      padding: 12px 16px;
      border-top: 1px solid var(--line);
    }
    .source-heading {
      margin: 0 0 8px;
      font-size: 17px;
      line-height: 1.35;
    }
    .source-paragraph {
      margin: 0 0 8px;
      color: #2c2c2e;
      white-space: pre-wrap;
      line-height: 1.72;
      font-size: 15px;
    }
    .source-paragraph + .source-paragraph {
      padding-top: 8px;
      border-top: 1px dashed rgba(0,0,0,.08);
    }
    .split-lines {
      display: grid;
      gap: 7px;
      color: #2c2c2e;
      line-height: 1.66;
      font-size: 15px;
    }
    .split-line {
      margin: 0;
    }
    .split-line + .split-line {
      padding-top: 7px;
      border-top: 1px dashed rgba(0,0,0,.07);
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
      border-radius: 16px;
      background: #f7f7f8;
      padding: 16px;
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
      border-radius: 16px;
      background: #f7f7f8;
      padding: 14px 16px;
      margin-top: 12px;
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
    .focus-pulse {
      outline: 3px solid rgba(0,113,227,.28);
      outline-offset: 4px;
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
      .topbar-inner, .hero, .layout, .page-shell { width: min(100% - 12px, 680px); }
      .page-shell { margin-bottom: 28px; }
      .content { gap: 10px; }
      .workspace-tabs {
        gap: 6px;
        margin-bottom: 8px;
        padding: 5px;
        border-radius: 14px;
      }
      .workspace-tabs button {
        border-radius: 10px;
        padding: 9px 8px;
        font-size: 12px;
      }
      .band {
        border: 0;
        border-radius: 16px;
        box-shadow: none;
      }
      .band-inner { padding: 14px; }
      .layout { grid-template-columns: 1fr; }
      .main-flow-tabs {
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        gap: 6px;
        margin-top: 14px;
        padding: 6px;
        border-radius: 14px;
      }
      .main-flow-tabs::-webkit-scrollbar { display: none; }
      .main-flow-tabs button {
        flex: 0 0 auto;
        min-width: 102px;
        border-radius: 10px;
        padding: 9px 8px;
        font-size: 12px;
      }
      .flow-stage-panel { margin-top: 10px; }
      .flow-stage-card {
        border-radius: 0;
        padding: 0;
        box-shadow: none;
      }
      .flow-stage-card h3 { font-size: 28px; }
      .stage-kicker {
        gap: 8px;
        margin-bottom: 8px;
        font-size: 12px;
      }
      .stage-number {
        width: 30px;
        height: 30px;
        font-size: 12px;
      }
      .stage-goal {
        margin-top: 8px;
        font-size: 15px;
        line-height: 1.55;
      }
      .stage-grid {
        grid-template-columns: 1fr;
        gap: 6px;
        margin-top: 10px;
      }
      .stage-block {
        border-radius: 10px;
        padding: 10px 11px;
      }
      .stage-block h4 {
        margin-bottom: 8px;
        font-size: 14px;
      }
      .stage-block ul,
      .stage-block ol {
        padding-left: 18px;
        line-height: 1.58;
      }
      .stage-script p,
      .stage-source p {
        line-height: 1.6;
      }
      .stage-original-group {
        border-radius: 10px;
        padding: 10px;
      }
      .content-tabs {
        margin-top: 12px;
        gap: 6px;
      }
      .content-tabs button {
        padding: 8px 10px;
        font-size: 12px;
      }
      .mirror-raw-head {
        display: grid;
        gap: 8px;
      }
      .raw-module-card {
        padding: 8px 9px;
      }
      .raw-module-head {
        grid-template-columns: auto minmax(0, 1fr) auto;
      }
      .raw-line span:last-child,
      .raw-module-card > p {
        font-size: 13px;
        line-height: 1.5;
      }
      .logic-card, .process-step, .flow-card, .framework-card,
      .section-block, .script-card, details.source-box {
        border-radius: 12px;
        padding: 12px;
      }
      .tool-card {
        border-radius: 12px;
      }
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
      .logic-grid, .process-map, .entry-grid, .framework-grid, .tool-grid, .guide-grid, .collection-grid, .raw-layout, .ability-two-col, .stage-original-groups { grid-template-columns: 1fr; }
      .raw-toc { position: static; }
      .module-head { grid-template-columns: 1fr; }
      .top-links { display: none; }
      .brand-logo { width: 116px; }
    }
    @media (max-width: 420px) {
      .topbar-inner, .hero, .layout, .page-shell { width: calc(100% - 8px); }
      .hero { padding-top: 20px; }
      .band { border-radius: 12px; }
      .band-inner, .module-body, .module-head { padding: 10px; }
      h1 { font-size: 30px; }
      .flow-stage-card { padding: 0; }
      .flow-stage-card h3 { font-size: 25px; }
      .stage-goal { font-size: 14px; }
      .stage-block {
        padding: 9px 10px;
      }
    }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <img class="hero-mini-logo" src="assets/logo.png" alt="幸福驿站">
      <h1>幸福学院市场服务手册</h1>
      <p class="hero-copy">我不相信人，我只相信流程。</p>
    </section>

    <section class="page-shell">
      <div class="content">
        <nav class="workspace-tabs" id="workspaceTabs" aria-label="工作台切换">
          <button type="button" class="active" data-workspace-target="marketFlow">大流程|从陌生人到合作伙伴</button>
          <button type="button" data-workspace-target="mirrorLibrary">镜子库|用流程标准照镜子</button>
        </nav>

        <section class="band required-master-flow workspace-panel" id="marketFlow">
          <div class="band-inner">
            <h2>大流程|从陌生人到合作伙伴</h2>
            <p>市场服务人员打开以后，只看自己处在哪一步：这一步做什么、标准是什么、原话怎么说、做完怎么复盘。</p>
            <nav class="main-flow-tabs" id="mainFlow" aria-label="必须掌握的主流程"></nav>
            <div class="flow-stage-panel" id="flowStagePanel"></div>
          </div>
        </section>

        <section class="band content-library workspace-panel" id="mirrorLibrary" hidden>
          <div class="band-inner">
            <h2>镜子库|用流程标准照镜子</h2>
            <p>镜子库是大流程某一个环节的具体操作。需要哪一步，就切到对应模块，对照流程标准复盘自己有没有按要求执行。</p>
            <div class="content-tabs" id="contentTabs" role="tablist" aria-label="内容库切换">
              <button type="button" class="active" data-content-target="rawSalon">沙龙</button>
              <button type="button" data-content-target="abilitySalonReview">沙龙复盘</button>
              <button type="button" data-content-target="rawCamp7">7天训练营</button>
              <button type="button" data-content-target="abilityCamp7Review">7天训练营复盘</button>
              <button type="button" data-content-target="modelCollection">榜样采访</button>
              <button type="button" data-content-target="rawOther">榜样选拔与教练招募</button>
              <button type="button" data-content-target="rawTalent">人才培养营</button>
              <button type="button" data-content-target="abilityFramework">市场服务</button>
              <button type="button" data-content-target="abilityThinking">总监思维</button>
              <button type="button" data-content-target="abilityTools">工具模型</button>
            </div>
          </div>
        </section>

        <section class="band ability-module-card ability-salon legacy-section" id="abilitySalon" aria-hidden="true">
          <div class="band-inner">
            <p class="eyebrow">能力库</p>
            <h2>沙龙</h2>
            <p>沙龙模块保留提炼总结和标准原文，现场需要开沙龙、通关、核查时直接看这一块。</p>
            <div class="ability-two-col">
              <div class="section-block">
                <h4>提炼总结</h4>
                <ul>
                  <li>沙龙不是传授知识，是用体验、发问、点评和作业让顾客看到自己。</li>
                  <li>一场沙龙只讲一个主题，难度越小、内容越少，越容易复制。</li>
                  <li>沙龙结束必须留作业、收作业、复盘反馈。</li>
                </ul>
              </div>
              <div class="section-block">
                <h4>标准原文</h4>
                <ul>
                  <li>严格按照8步标准流程。</li>
                  <li>一个开沙龙的人一场沙龙只带2人，两个都是顾客，不允许旁听，只能参与。</li>
                  <li>陌生人沙龙结束后面对面建群，方便留作业、收作业、通知下次沙龙；教练也要完成作业，并提交。</li>
                  <li>只要是沙龙标准流程里面没有的，不要说，不要做。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="band ability-module-card ability-salon-review content-panel" id="abilitySalonReview">
          <span id="salonReview" class="anchor-sentinel" aria-hidden="true"></span>
          <div class="band-inner">
            <h2>沙龙复盘</h2>
            <p>按照原文标准整理关键问题，活动结束后对照核查。</p>
            <h3 class="ability-section-title">复盘清单</h3>
            <ol class="review-list" id="reviewList"></ol>
          </div>
        </section>

        <section class="band ability-module-card ability-camp7 legacy-section" id="abilityCamp7" aria-hidden="true">
          <div class="band-inner">
            <p class="eyebrow">能力库</p>
            <h2>7天训练营</h2>
            <p>7天训练营保留提炼总结和标准原文，重点是沙龙筛选导入、持续提要求、作业、反馈和升级。</p>
            <div class="ability-two-col">
              <div class="section-block">
                <h4>提炼总结</h4>
                <ul>
                  <li>顾客从沙龙或者转介绍来，不用邀约破冰。</li>
                  <li>一个教练带2个顾客，就是一个幸福训练营，不混合开班。</li>
                  <li>每天课程之前必须通关，保证幸福教练掌握正确标准。</li>
                  <li>每天通过提要求、主题训练、作业实践、榜样采访和闭环升级，帮助学员内观行动。</li>
                </ul>
              </div>
              <div class="section-block">
                <h4>标准原文</h4>
                <ul>
                  <li>7天训练营的顾客是从沙龙或者转介绍来的，不用邀约破冰。</li>
                  <li>一个教练带2个顾客，就是一个幸福训练营，一天可以错开开设多个营，不混合开班。</li>
                  <li>每天课程之前必须要通关，强化幸福能力交付，保证幸福教练掌握正确的标准。</li>
                  <li>不配合、不按要求实践的学员，后面再给一次机会下次再参加，2次都不合格者，取消1年内学习资格。</li>
                  <li>随时随地及时发现榜样，推荐榜样。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="band ability-module-card ability-camp7-review content-panel" id="abilityCamp7Review" hidden>
          <div class="band-inner">
            <h2>7天训练营复盘</h2>
            <p>按照原文标准整理关键问题，重点看是否按要求参与、是否完成作业、是否及时反馈和筛选。</p>
            <div class="section-block">
              <h4>关键问题</h4>
              <ol class="review-list" id="camp7ReviewList"></ol>
            </div>
          </div>
        </section>

        <section class="band ability-module-card ability-other content-panel" id="abilityFramework" hidden>
          <div class="band-inner">
            <h2>市场服务</h2>
            <p>市场服务123456按结构查看，方便驿站主快速回忆角色、目标、流程、人才和工具。</p>
            <div class="framework-grid" id="frameworkGrid"></div>
          </div>
        </section>

        <section class="band ability-module-card ability-other content-panel" id="abilityThinking" hidden>
          <div class="band-inner">
            <h2>总监思维</h2>
            <p>总监和驿站主的分工、心态辅导、顾虑处理、学习效果，单独放在这里照镜子。</p>
            <div class="framework-grid" id="thinkingGrid"></div>
          </div>
        </section>

        <section class="band ability-module-card ability-other content-panel" id="abilityTools" hidden>
          <div class="band-inner">
            <h2>工具模型</h2>
            <p>自检表、优点清单、市场服务模型和123456参考图，作为现场辅助工具使用。</p>
            <div class="tool-grid" id="toolGrid"></div>
          </div>
        </section>

        <section class="band ability-module-card mirror-raw-panel tone-salon content-panel" id="rawSalon" hidden>
          <div class="band-inner">
            <div class="mirror-raw-head">
              <div>
                <h2>沙龙</h2>
                <p>按沙龙原文拆成内容模块，标题加粗，内容保留原话和原序号。</p>
              </div>
            </div>
            <div class="raw-copy-list" id="rawSalonRows"></div>
          </div>
        </section>

        <section class="band ability-module-card mirror-raw-panel tone-camp content-panel" id="rawCamp7" hidden>
          <div class="band-inner">
            <div class="mirror-raw-head">
              <div>
                <h2>7天训练营</h2>
                <p>包含市场培训手册里的7天训练营标准，以及《7幸福训练营》复制标准流程。</p>
              </div>
            </div>
            <div class="raw-copy-list" id="rawCamp7Rows"></div>
          </div>
        </section>

        <section class="band ability-module-card mirror-raw-panel tone-talent content-panel" id="rawTalent" hidden>
          <div class="band-inner">
            <div class="mirror-raw-head">
              <div>
                <h2>人才培养营</h2>
                <p>按照人才培养营原文呈现流程与标准，方便培训、通关和复盘。</p>
              </div>
            </div>
            <div class="raw-copy-list" id="rawTalentRows"></div>
          </div>
        </section>

        <section class="band ability-module-card mirror-raw-panel tone-other content-panel" id="rawOther" hidden>
          <div class="band-inner">
            <div class="mirror-raw-head">
              <div>
                <h2>榜样选拔与教练招募</h2>
                <p>榜样选拔、榜样群、教练招募和严格复制标准，统一放在这里随查随看。</p>
              </div>
            </div>
            <div class="raw-copy-list" id="rawOtherRows"></div>
          </div>
        </section>

        <section class="band legacy-section" id="quickFlows" aria-hidden="true">
          <div class="band-inner">
            <div class="entry-grid" id="quickFlowGrid"></div>
          </div>
        </section>

        <section class="band legacy-section" aria-hidden="true">
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

        <section class="legacy-section" id="modules" aria-hidden="true">
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

        <section class="band ability-module-card ability-model content-panel" id="modelCollection" hidden>
          <div class="band-inner">
            <p class="eyebrow">榜样采集标准与流程</p>
            <h2>先激活情感，再按16问一次性采集完整。</h2>
            <p>榜样采集不是随便聊天，而是把学员真实改变的场景、时间、细节、心情、结果完整采集出来，形成可传播的案例。</p>
            <div class="collection-grid" id="collectionGrid"></div>
            <div class="section-block" style="margin-top:14px">
              <h4>榜样采访问句模版</h4>
              <div class="question-list" id="collectionQuestions"></div>
            </div>
          </div>
        </section>

        <section class="band legacy-section" id="scripts" aria-hidden="true">
          <div class="band-inner">
            <p class="eyebrow">原文话术库</p>
            <h2>常用话术直接照搬。</h2>
            <p>这里不做改写，服务人员先照着用，熟练后再脱稿。</p>
            <div class="script-grid" id="scriptLibrary"></div>
          </div>
        </section>

        <section class="band legacy-section" id="toolbox" aria-hidden="true">
          <div class="band-inner">
            <p class="eyebrow">工具与模型</p>
            <h2>模型、表格和原图都放在这里，现场能直接对照。</h2>
            <p>幸福自检表用于检测，优点清单用于转念，市场服务模型用于把客户服务过程统一到检测、诊断、方案、陪伴。</p>
            <div class="tool-grid" id="toolGrid"></div>
          </div>
        </section>

        <section class="band ability-module-card ability-raw content-panel" id="raw" hidden>
          <div class="band-inner">
            <p class="eyebrow">原文全文</p>
            <h2>完整文稿也在页面里。</h2>
            <p>上面是流程化展示；这里保留两份原始文稿全文，按段落重新排版，便于搜索、核对、复制和回到流程。</p>
            <div class="raw-layout">
              <div class="raw-toc" id="rawToc"></div>
              <div id="rawManual"></div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>

  <script type="application/json" id="manualData">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  <script>
    const manual = JSON.parse(document.getElementById('manualData').textContent);
    const mainFlow = document.getElementById('mainFlow');
    const flowStagePanel = document.getElementById('flowStagePanel');
    const moduleGrid = document.getElementById('moduleGrid');
    const scriptLibrary = document.getElementById('scriptLibrary');
    const rawManual = document.getElementById('rawManual');
    const emptyState = document.getElementById('emptyState');
    const quickFlowGrid = document.getElementById('quickFlowGrid');
    const frameworkGrid = document.getElementById('frameworkGrid');
    const thinkingGrid = document.getElementById('thinkingGrid');
    const reviewList = document.getElementById('reviewList');
    const collectionGrid = document.getElementById('collectionGrid');
    const collectionQuestions = document.getElementById('collectionQuestions');
    const toolGrid = document.getElementById('toolGrid');
    const rawToc = document.getElementById('rawToc');
    const contentTabs = document.getElementById('contentTabs');
    const workspaceTabs = document.getElementById('workspaceTabs');

    function repairAbilityCopy() {
      const model = document.getElementById('modelCollection');
      if (model) {
        const eyebrow = model.querySelector('.eyebrow');
        const title = model.querySelector('h2');
        const intro = model.querySelector('p:not(.eyebrow)');
        if (eyebrow) eyebrow.remove();
        if (title) title.textContent = '榜样采访';
        if (intro) {
        intro.textContent = '不管是沙龙还是7天训练营，搜集来的榜样都统一进入一个大群，等待被采访。采集不是随便聊天，而是把学员真实改变的场景、时间、细节、心情、结果完整采集出来，形成可传播的案例。';
        }
      }
      replaceList('#abilitySalon .ability-two-col .section-block:nth-child(2) ul', [
        '严格按照8步标准流程。',
        '一个开沙龙的人一场沙龙只带2人，两个都是顾客，不允许旁听，只能参与。',
        '陌生人沙龙结束后面对面建群，方便留作业、收作业、通知下次沙龙；教练也要完成作业，并提交。',
        '随时随地及时发现榜样，推荐榜样，这个是每一个开沙龙的人的能力。',
        '突破成长的榜样在一个群，接受榜样采访，进行激活。',
        '只要是沙龙标准流程里面没有的，不要说，不要做。'
      ]);
      replaceList('#abilityCamp7 .ability-two-col .section-block:nth-child(2) ul', [
        '7天训练营的顾客是从沙龙或者转介绍来的，不用邀约破冰。',
        '一个教练带2个顾客，就是一个幸福训练营，一天可以错开开设多个营，不混合开班。',
        '转介绍的顾客，可以直接参加幸福训练营。',
        '7天幸福训练营受益通过审核的榜样学员，可带沙龙和7天幸福训练营，但不能带21天。',
        '每天课程之前必须要通关，强化幸福能力交付，保证幸福教练掌握正确的标准。',
        '突破成长的榜样在一个群，接受榜样采访，进行激活。',
        '建立榜样群，有突破的榜样及时进群，所有的榜样都在一个群，等待被采访。'
      ]);
    }

    function replaceList(selector, lines) {
      const list = document.querySelector(selector);
      if (!list) return;
      list.innerHTML = lines.map((line) => '<li>' + safeHtml(line) + '</li>').join('');
      }

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

    function setActiveFlow(id) {
      document.querySelectorAll('[data-flow-nav-id]').forEach((button) => {
        button.classList.toggle('active', button.dataset.flowNavId === id);
      });
    }

    function toggleCheck(button) {
      button.classList.toggle('done');
    }

    function scrollToTarget(id) {
      const target = document.getElementById(id);
      if (!target) return;
      if (target.tagName === 'DETAILS') target.open = true;
      target.closest('details')?.setAttribute('open', '');
      target.scrollIntoView({ block: 'start', behavior: 'smooth' });
      if (target.dataset.moduleId) setActiveModule(target.dataset.moduleId);
      if (target.dataset.flowId) setActiveFlow(target.dataset.flowId);
      target.classList.add('focus-pulse');
      window.setTimeout(() => target.classList.remove('focus-pulse'), 1200);
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

    function compactCopyButton(text, className = 'mini-copy') {
      return '<button type="button" class="' + className + '" data-copy-text="' + safeHtml(text) + '" aria-label="复制">复制</button>';
    }

    async function copyCompactText(button) {
      await copyText(button.dataset.copyText || '');
      const original = button.textContent;
      button.textContent = '已复制';
      window.setTimeout(() => {
        button.textContent = original || '复制';
      }, 900);
    }

    function bindCompactCopy(root = document) {
      root.querySelectorAll('[data-copy-text]').forEach((button) => {
        if (button.dataset.copyBound) return;
        button.dataset.copyBound = '1';
        button.addEventListener('click', () => copyCompactText(button));
      });
    }

    function initWorkspaceTabs() {
      if (!workspaceTabs) return;
      const buttons = [...workspaceTabs.querySelectorAll('[data-workspace-target]')];
      const panels = [...document.querySelectorAll('.workspace-panel')];
      const contentPanels = [...document.querySelectorAll('.content-panel')];
      function activate(targetId) {
        buttons.forEach((button) => button.classList.toggle('active', button.dataset.workspaceTarget === targetId));
        panels.forEach((panel) => {
          panel.hidden = panel.id !== targetId;
        });
        contentPanels.forEach((panel) => {
          panel.hidden = targetId !== 'mirrorLibrary' || panel.id !== (contentTabs?.querySelector('button.active')?.dataset.contentTarget || 'abilitySalonReview');
        });
      }
      buttons.forEach((button) => {
        button.addEventListener('click', () => activate(button.dataset.workspaceTarget));
      });
      activate(buttons[0]?.dataset.workspaceTarget || 'marketFlow');
    }

    function renderMasterFlow(activeIndex = 0) {
      mainFlow.innerHTML = manual.masterFlow.map((stage, index) => (
        '<button type="button" class="' + (index === activeIndex ? 'active' : '') + '" data-master-flow-index="' + index + '">' +
          safeHtml(stage.number) + '<br>' + safeHtml(stage.title) +
        '</button>'
      )).join('');
      renderMasterStage(activeIndex);
      mainFlow.querySelectorAll('[data-master-flow-index]').forEach((button) => {
        button.addEventListener('click', () => {
          renderMasterFlow(Number(button.dataset.masterFlowIndex));
        });
      });
    }

    function renderMasterStage(index) {
      const stage = manual.masterFlow[index] || manual.masterFlow[0];
      flowStagePanel.innerHTML =
        '<article class="flow-stage-card" data-search-text="' + safeHtml([stage.title, stage.tag, stage.goal, (stage.process || []).join(' '), stage.standards.join(' '), stage.script.join(' '), stage.review.join(' ')].join(' ')) + '">' +
          '<div class="stage-kicker"><span class="stage-number">' + safeHtml(stage.number) + '</span><span>' + safeHtml(stage.tag) + '</span></div>' +
          '<h3>' + safeHtml(stage.title) + '</h3>' +
          '<p class="stage-goal">' + safeHtml(stage.goal) + '</p>' +
          '<div class="stage-grid">' +
            renderStageList('stage-process', '具体流程', stage.process || []) +
            renderStageList('stage-standard', '标准', stage.standards) +
            renderStageScript(stage.script) +
            renderStageList('stage-review', '复盘', stage.review) +
            renderStageOriginal(stage.original) +
            '<div class="stage-block stage-source"><h4><span>内容库位置</span>' + compactCopyButton(stage.source.replace('对应能力', '对应内容')) + '</h4><p>' + safeHtml(stage.source.replace('对应能力', '对应内容')) + '</p></div>' +
          '</div>' +
        '</article>';
      bindCompactCopy(flowStagePanel);
    }

    function renderStageList(className, title, lines) {
      if (!lines || !lines.length) return '';
      return '<div class="stage-block ' + className + '"><h4><span>' + title + '</span>' + compactCopyButton(lines.join('\\n')) + '</h4><ol>' +
        lines.map((line) => '<li>' + safeHtml(line) + '</li>').join('') +
      '</ol></div>';
    }

    function renderStageScript(lines) {
      return '<div class="stage-block stage-script"><h4><span>原话照搬</span>' + compactCopyButton(lines.join('\\n')) + '</h4><ol>' +
        lines.map((line) => '<li>' + safeHtml(line) + '</li>').join('') +
      '</ol></div>';
    }

    function renderStageOriginal(lines) {
      if (!lines || !lines.length) return '';
      const intro = [];
      const groups = [];
      let current = null;
      lines.forEach((line) => {
        const text = String(line || '').trim();
        if (!text) return;
        if (isOriginalHeading(text)) {
          current = { title: text.replace(/：$/, ''), lines: [] };
          groups.push(current);
          return;
        }
        if (current) current.lines.push(text);
        else intro.push(text);
      });
      return '<div class="stage-block stage-original"><h4><span>标准原文</span></h4>' +
        (intro.length ? '<div class="stage-original-intro">' + intro.map((line) => '<p>' + safeHtml(line) + '</p>').join('') + '</div>' : '') +
        '<div class="stage-original-groups">' +
          groups.map((group) => '<div class="stage-original-group"><h5><span>' + safeHtml(group.title) + '</span></h5><div class="stage-original-line-list">' +
            group.lines.map((line) => renderNumberedTextLine(line)).join('') +
          '</div></div>').join('') +
        '</div></div>';
    }

    function renderNumberedTextLine(line) {
      const parsed = parseRawOrder(line);
      return '<div class="raw-line">' +
        '<span class="raw-order' + (parsed.order ? '' : ' empty') + '">' + safeHtml(parsed.order) + '</span>' +
        '<span>' + formatRawLine(parsed.text || line) + '</span>' +
      '</div>';
    }

    function isOriginalHeading(text) {
      return /^(心态标准|动作标准|学习要求|作业要求|复制标准)[：:]?$/.test(text);
    }

    function initContentTabs() {
      if (!contentTabs) return;
      const buttons = [...contentTabs.querySelectorAll('[data-content-target]')];
      const panels = [...document.querySelectorAll('.content-panel')];
      function activate(targetId) {
        buttons.forEach((button) => button.classList.toggle('active', button.dataset.contentTarget === targetId));
        const mirrorActive = !document.getElementById('mirrorLibrary')?.hidden;
        panels.forEach((panel) => {
          panel.hidden = !mirrorActive || panel.id !== targetId;
        });
      }
      buttons.forEach((button) => {
        button.addEventListener('click', () => activate(button.dataset.contentTarget));
      });
      activate(buttons[0]?.dataset.contentTarget || panels[0]?.id);
    }

    function renderQuickFlows() {
      if (!quickFlowGrid) return;
      quickFlowGrid.innerHTML = manual.quickFlows.map((flow) => {
        const searchText = [flow.title, flow.tag, flow.standard, flow.steps.join(' '), flow.keywords || ''].join(' ');
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
          '<div><h3>' + safeHtml(item.title) + '</h3>' + formatDisplayText(item.body) + '</div>' +
        '</article>'
      )).join('');
    }

    function renderThinking() {
      thinkingGrid.innerHTML = manual.directorThinking.map((item, index) => (
        '<article class="framework-card" data-search-text="' + safeHtml([item.title, item.body].join(' ')) + '">' +
          '<div class="framework-number">' + (index + 1) + '</div>' +
          '<div><h3>' + safeHtml(item.title) + '</h3>' + formatDisplayText(item.body) + '</div>' +
        '</article>'
      )).join('');
    }

    function renderReviewTools() {
      reviewList.innerHTML = manual.salonReview.map((item) => (
        '<li data-search-text="' + safeHtml(item) + '">' + safeHtml(item) + '</li>'
      )).join('');
      const camp7ReviewList = document.getElementById('camp7ReviewList');
      if (camp7ReviewList) {
        camp7ReviewList.innerHTML = (manual.camp7Review || []).map((item) => (
          '<li data-search-text="' + safeHtml(item) + '">' + safeHtml(item) + '</li>'
        )).join('');
      }
    }

    function renderModelCollection() {
      collectionGrid.innerHTML = manual.modelCollection.steps.map((step, index) => (
        '<article class="collection-card" data-search-text="' + safeHtml([step.title, step.body, step.purpose].join(' ')) + '">' +
          '<span class="tag">第' + (index + 1) + '步</span>' +
          '<h3>' + safeHtml(step.title) + '</h3>' +
          formatDisplayText(step.body) +
          '<div class="standard">' + formatPlainBreaks(step.purpose) + '</div>' +
        '</article>'
      )).join('');
      collectionQuestions.innerHTML = manual.modelCollection.questions.map((question, index) => (
        '<div class="question-card" data-search-text="' + safeHtml(question) + '">' +
          '<strong>' + (index + 1) + '.</strong> ' + safeHtml(question) +
        '</div>'
      )).join('');
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
          '<div class="module-body"><div class="step-row">' + steps + '</div><div class="section-grid">' + sections + '</div><div class="check-panel"><strong>轻量通关</strong>' + checks + '</div>' +
          '</div>' +
          '</article>';
      }).join('');
      moduleGrid.querySelectorAll('.check-item').forEach((button) => {
        button.addEventListener('click', () => toggleCheck(button));
      });
      moduleGrid.querySelectorAll('[data-jump-target]').forEach((button) => {
        button.addEventListener('click', () => scrollToTarget(button.dataset.jumpTarget));
      });
    }

    function renderScripts() {
      scriptLibrary.innerHTML = manual.scriptLibrary.map((item, index) => (
        '<article class="script-card" data-search-text="' + [item.title, item.tag, item.text].join(' ').replace(/"/g, '&quot;') + '">' +
          '<div class="script-top"><div><h3>' + item.title + '</h3><span class="tag">' + item.tag + '</span></div><button type="button" class="copy-button" data-copy-index="' + index + '">复制</button></div>' +
          '<div class="script-text">' + formatPlainBreaks(item.text) + '</div>' +
        '</article>'
      )).join('');
      scriptLibrary.querySelectorAll('[data-copy-index]').forEach((button) => {
        button.addEventListener('click', () => copyText(manual.scriptLibrary[Number(button.dataset.copyIndex)].text));
      });
    }

    function renderRawManual() {
      rawToc.innerHTML = manual.sources.map((source, sourceIndex) => (
        '<button type="button" data-jump-target="source-' + sourceIndex + '">' + safeHtml(source.title) + '</button>'
      )).join('');
      rawManual.innerHTML = manual.sources.map((source, sourceIndex) => {
        const blocks = source.content
          .split(/\\n{2,}/)
          .map((block) => block.trim())
          .filter(Boolean);
        return '<details class="source-section" id="source-' + sourceIndex + '" open>' +
          '<summary>' + safeHtml(source.title) + '</summary>' +
          blocks.map((block, blockIndex) => {
            const firstLine = block.split('\\n').find((line) => line.trim())?.trim() || '';
            const heading = firstLine.length <= 28 ? firstLine : '原文段落 ' + (blockIndex + 1);
            return '<article class="source-block" id="source-' + sourceIndex + '-' + blockIndex + '" data-search-text="' + safeHtml([source.title, block].join(' ')) + '">' +
              '<h3 class="source-heading">' + safeHtml(heading) + '</h3>' +
              formatSourceBlock(block) +
              '<div class="module-actions"><button type="button" class="small-action" data-copy-source="' + sourceIndex + '-' + blockIndex + '">复制</button></div>' +
            '</article>';
          }).join('') +
        '</details>';
      }).join('');
      rawToc.querySelectorAll('[data-jump-target]').forEach((button) => {
        button.addEventListener('click', () => scrollToTarget(button.dataset.jumpTarget));
      });
      rawManual.querySelectorAll('[data-copy-source]').forEach((button) => {
        button.addEventListener('click', () => {
          const card = button.closest('.source-block');
          copyText(card ? card.innerText : '');
        });
      });
    }

    function renderMirrorRawPanels() {
      (manual.rawMirrorSources || []).forEach((source) => {
        const target = document.getElementById(source.id + 'Rows');
        if (!target) return;
        const lines = splitDisplayLines(source.content)
          .map((line) => line.trim())
          .filter(Boolean);
        const blocks = buildRawMirrorBlocks(lines, source.title);
        target.innerHTML = blocks.map((block, index) => {
          const displayTitle = simplifyRawBlockTitle(block.title, block.lines);
          const displayLines = block.lines.length ? block.lines : [block.title];
          const moduleText = [block.order ? block.order + ' ' + displayTitle : displayTitle, ...displayLines].join('\\n');
          return '<article class="raw-module-card" data-search-text="' + safeHtml([source.title, moduleText].join(' ')) + '">' +
            '<div class="raw-module-head">' +
              '<span class="raw-order' + (block.order ? '' : ' empty') + '">' + safeHtml(block.order) + '</span>' +
              '<h3 class="raw-module-title">' + safeHtml(displayTitle || ('内容模块 ' + (index + 1))) + '</h3>' +
              compactCopyButton(moduleText, 'mini-copy raw-copy-btn') +
            '</div>' +
            renderRawBlockLines(displayLines) +
          '</article>';
        }).join('');
      });
    }

    function simplifyRawBlockTitle(title, lines) {
      const text = String(title || '').trim();
      if (!text) return '';
      if (!lines.length && text.length > 18) return '说明';
      if (text.includes('流程与标准')) return '流程标准';
      if (text.includes('若想最高效')) return '标准说明';
      if (text.length > 22) return text.slice(0, 20) + '…';
      return text;
    }

    function buildRawMirrorBlocks(lines, sourceTitle) {
      const blocks = [];
      let current = null;
      lines.forEach((line) => {
        if (isSourceWrapperLine(line, sourceTitle)) return;
        const parsed = parseRawOrder(line);
        const startsBlock = isRawBlockHeading(line) || !current;
        if (startsBlock) {
          if (current) blocks.push(current);
          current = {
            order: parsed.order,
            title: parsed.text || line,
            lines: []
          };
          return;
        }
        current.lines.push(line);
      });
      if (current) blocks.push(current);
      return blocks.filter((block) => block.title || block.lines.length);
    }

    function isSourceWrapperLine(line, sourceTitle) {
      const text = String(line || '').trim();
      const parsed = parseRawOrder(text);
      const bareText = (parsed.text || text).replace(/[：:]$/, '').trim();
      if (/^0[）)]$/.test(text) || /^0[）)]$/.test(bareText)) return true;
      const wrapperTitles = [
        sourceTitle,
        sourceTitle.replace(/模块$/, ''),
        '7天幸福训练营',
        '幸福早课人才培养营',
        '幸福学院市场培训手册',
        '幸福学院市场培训手册（1.0）'
      ];
      return wrapperTitles.some((title) => (
        text === title ||
        text.endsWith(title) ||
        bareText === title ||
        bareText.startsWith(title + '（')
      ));
    }

    function isRawBlockHeading(line) {
      const text = String(line || '').trim();
      const parsed = parseRawOrder(text);
      const title = parsed.text || text;
      if (/^(心态标准|动作标准|学习要求|作业要求|复制标准)$/.test(title)) return true;
      if (/^(破冰|发心|热场|提要求|主题|分享|采访|闭环|榜样采访)$/.test(title)) return true;
      return text.length <= 54 && /^([一二三四五六七八九十]+、|[（(]?[一二三四五六七八九十]+[）)]|第[0-9一二三四五六七八九十]+天|正式|导入|🌈|📚|✅[0-9]?|⚠)/.test(text);
    }

    function renderRawBlockLines(lines) {
      if (!lines.length) return '';
      return '<div class="raw-line-list">' + lines.map((line) => {
        const parsed = parseRawOrder(line);
        return '<div class="raw-line">' +
          '<span class="raw-order' + (parsed.order ? '' : ' empty') + '">' + safeHtml(parsed.order) + '</span>' +
          '<span>' + formatRawLine(parsed.text || line) + '</span>' +
        '</div>';
      }).join('') + '</div>';
    }

    function parseRawOrder(line) {
      const text = String(line || '').trim();
      const match = text.match(/^([0-9]{1,2}[.、）)]|[（(]?[一二三四五六七八九十]+[、）)]|第[0-9一二三四五六七八九十]+[天步]|[①②③④⑤⑥⑦⑧⑨⑩])\\s*(.+)$/);
      if (!match) return { order: '', text };
      return { order: match[1], text: match[2].trim() };
    }

    function formatRawLine(line, index) {
      const text = String(line || '').trim();
      if (!text) return '';
      const heading = isRawHeading(text);
      if (heading) return '<strong>' + safeHtml(text) + '</strong>';
      const colonMatch = text.match(/^([^：:]{2,18})[：:](.+)$/);
      if (colonMatch) {
        return '<strong>' + safeHtml(colonMatch[1] + '：') + '</strong>' + safeHtml(colonMatch[2].trim());
      }
      const numberMatch = text.match(/^([0-9]{1,2}[.、）)]|[一二三四五六七八九十]+[）、]|第[0-9一二三四五六七八九十]+[天步]|[①②③④⑤⑥⑦⑧⑨⑩])\\s*(.+)$/);
      if (numberMatch) {
        return '<strong>' + safeHtml(numberMatch[1]) + '</strong>' + safeHtml(numberMatch[2]);
      }
      return safeHtml(text);
    }

    function isRawHeading(text) {
      return text.length <= 34 && /^(一、|二、|三、|四、|五、|六、|七、|八、|九、|十、|[一二三四五六七八九十]+）|第[0-9一二三四五六七八九十]+天|正式|导入|\\(|（|🌈|✅|📚|⚠)/.test(text);
    }

    function getTargetId(item) {
      if (item.dataset.targetId) return item.dataset.targetId;
      if (item.id) return item.id;
      const owner = item.closest('[id]');
      return owner ? owner.id : 'process';
    }

    function formatSourceBlock(block) {
      return splitDisplayLines(block)
        .map((line) => '<p class="source-text source-paragraph">' + safeHtml(line) + '</p>')
        .join('');
    }

    function formatDisplayText(text) {
      return '<div class="split-lines">' + splitDisplayLines(text)
        .map((line) => '<p class="split-line">' + safeHtml(line) + '</p>')
        .join('') + '</div>';
    }

    function formatPlainBreaks(text) {
      return splitDisplayLines(text).map((line) => safeHtml(line)).join('<br>');
    }

    function splitDisplayLines(text) {
      return String(text || '')
        .replace(/\\u00a0/g, ' ')
        .split('\\n')
        .flatMap((line) => splitDenseLine(line))
        .map((line) => line.trim())
        .filter(Boolean);
    }

    function splitDenseLine(line) {
      const compact = String(line || '').trim();
      if (!compact) return [];
      const expanded = compact.length > 70
        ? compact.replace(/([。！？；;])(?=[^”’）】\\]\\s])/g, '$1\\n')
        : compact;
      return expanded
        .replace(/([。！？；;])(?=(第[0-9一二三四五六七八九十]+[步天]|[0-9]{1,2}[.、]|[①②③④⑤⑥⑦⑧⑨⑩]|✅|⚠|💡|😇|😄|📢|⛏|🚀|🥇|🍀|🌟))/g, '$1\\n')
        .replace(/([^\\\\n\\d])(?=(第[0-9一二三四五六七八九十]+步[:：]|[0-9]{1,2}[.、](?!\\\\d)|[①②③④⑤⑥⑦⑧⑨⑩]|✅|⚠|💡|😇|😄|📢|⛏|🚀|🥇|🍀|🌟))/g, '$1\\n')
        .replace(/([^\\\\n])(?=(一个服务理念|一类角色定位|两个沟通心法|两种开拓方法|三个必做目标|三大核心关注|四步服务流程|四阶人才漏斗|四种人才特征|四步个人服务步骤|五步标准沟通|五步人才培养|六个销售武器|我们的共同约定|对于幸福驿站市场服务的认识|三种学员不收|只收一种学员))/g, '$1\\n')
        .split('\\n');
    }

    function getResultTitle(item) {
      const cardTitle = item.querySelector('h3')?.textContent || item.closest('.band')?.querySelector('h2')?.textContent || item.textContent;
      return cardTitle.trim().slice(0, 42);
    }

    repairAbilityCopy();
    renderMasterFlow();
    renderQuickFlows();
    renderFramework();
    renderThinking();
    renderReviewTools();
    renderModules();
    renderModelCollection();
    renderScripts();
    renderToolbox();
    renderRawManual();
    renderMirrorRawPanels();
    initContentTabs();
    initWorkspaceTabs();

    const observer = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) setActiveModule(active.target.dataset.moduleId);
    }, { rootMargin: '-20% 0px -70% 0px', threshold: [0.1, 0.4, 0.8] });
    document.querySelectorAll('[data-module-id]').forEach((card) => observer.observe(card));
    const flowObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) setActiveFlow(active.target.dataset.flowId);
    }, { rootMargin: '-18% 0px -65% 0px', threshold: [0.1, 0.4, 0.8] });
    document.querySelectorAll('[data-flow-id]').forEach((card) => flowObserver.observe(card));
    setActiveModule(manual.modules[0].id);
    setActiveFlow('flow-0');
  </script>
</body>
</html>
`;

fs.writeFileSync(outputFile, html, 'utf8');
console.log(`Wrote ${outputFile}`);
