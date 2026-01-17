
import React, { useState } from 'react';
import { 
  Plane, Calendar, Users, Briefcase, Info, Home, 
  MapPin, AlertTriangle, Coffee, Luggage, Navigation 
} from 'lucide-react';

// Data Definitions
const FLIGHTS = [
  { type: '去程', date: '2/6', time: '02:35-05:45', route: '桃園 → 清洲', terminal: '桃機第一航廈', airline: '易斯達航空 ZE782', meet: '2/5 22:00 桃機集合' },
  { type: '回程', date: '2/9', time: '23:45-01:15(+1)', route: '清洲 → 桃園', terminal: '清洲第一航廈', airline: '易斯達航空 ZE781', meet: '19:30 出發前往機場' }
];

const SCHEDULE = [
  {
    day: '2/6 (五)',
    items: [
      { time: '07:30', title: '上巴士' },
      { time: '09:00', title: '抵達月明洞', detail: '需載SS先到主生命' },
      { time: '10:00-12:00', title: '律師特講 OR 宋代表' },
      { time: '12:00', title: '真美便當 @316餐廳' },
      { time: '13:30-16:30', title: '台韓LTC：校園見證、小組交流、禱告' },
      { time: '15:30-17:30', title: '律師特講 OR 宋代表' },
      { time: '18:00', title: '晚餐：好口味' },
      { time: '20:00', title: '回大屯山連線' },
      { time: '住宿', title: '大屯山飯店' }
    ]
  },
  {
    day: '2/7 (六)',
    items: [
      { time: '07:00-09:00', title: '大屯山飯店早餐' },
      { time: '09:00', title: '出發前往月明洞', detail: 'LTC開幕、CAM中央話語、鄭鑽石牧師' },
      { time: '12:30', title: '真美便當 @316餐廳' },
      { time: '下午', title: '韓國二代通過式 @316本堂' },
      { time: '18:00', title: '李本家', detail: '買隔天早餐 (發10000)' },
      { time: '20:30', title: '逛超商' },
      { time: '21:00', title: '回大屯山飯店' }
    ]
  },
  {
    day: '2/8 (日)',
    items: [
      { time: '早餐', title: '自理' },
      { time: '08:30', title: '出發' },
      { time: '09:00', title: '主日禮拜前拍大合照' },
      { time: '09:20', title: '入本堂主日禮拜', detail: '主日後龍錫牧師打招呼' },
      { time: '12:30', title: '真美便當 @316餐廳' },
      { time: '14:00-17:00', title: '二代中央分享' },
      { time: '18:00', title: '火烤小章魚' },
      { time: '20:00', title: '逛超商' },
      { time: '20:30', title: '回大屯山飯店' }
    ]
  },
  {
    day: '2/9 (一)',
    items: [
      { time: '08:15-08:30', title: '退房' },
      { time: '08:30-09:30', title: '出發漢南大校園' },
      { time: '09:30-11:00', title: '漢南大導覽+交流' },
      { time: '11:00-12:30', title: '忠南大導覽+交流' },
      { time: '12:30', title: '燒烤 @窮童叔叔' },
      { time: '14:00-17:00', title: '韓南大學校園導覽' },
      { time: '17:30', title: '晚餐自理 @附近餐廳' },
      { time: '19:30', title: '出發前往機場' }
    ]
  }
];

const PACKING_LIST = {
  must: [
    "FM隨身聽 (非手機網路FM，請務必事先測試)",
    "護照",
    "網卡或國際漫遊"
  ],
  personal: [
    "個人藥品 (防蚊、胃藥、止痛、暈車、綜合維他命等)",
    "錢包、零用錢 (韓幣)",
    "雨傘、雨衣",
    "隱形眼鏡盒 (務必準備架式眼鏡)",
    "隨身背包",
    "布拖鞋 (進316館使用)",
    "隨身水壺",
    "羽絨暖套+手套+圍巾",
    "行動電源 (FM隨身聽電池、充電器)",
    "毛巾、面紙",
    "轉換插頭 (兩孔220伏特)、延長線",
    "個人化妝保養與洗用品",
    "保濕用品",
    "筆記本、筆",
    "小而輕可以填飽的食物",
    "裝山泉水空瓶 (600cc以下，數量不限)",
    "主日禮拜正裝"
  ]
};

// UI Components
const Header = () => (
  <div className="bg-blue-600 text-white p-8 text-center rounded-b-3xl shadow-xl mb-6">
    <h1 className="text-4xl font-bold mb-2">2026 大學部 LTC</h1>
    <h2 className="text-2xl font-medium mb-4 italic">訪韓手冊</h2>
    <div className="inline-block bg-red-800 px-4 py-1 rounded-full text-sm font-bold">
      訪韓期間 2/6 ~ 2/9
    </div>
    <div className="mt-6 flex justify-center">
        <div className="relative">
            <div className="w-24 h-24 bg-pink-300 rounded-full border-4 border-white overflow-hidden flex items-center justify-center">
                 <span className="text-4xl">😎</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-md">
                <Luggage size={20} className="text-blue-800" />
            </div>
        </div>
    </div>
  </div>
);

const SectionTitle = ({ icon: Icon, title, color = "bg-blue-500" }: any) => (
  <div className={`flex items-center gap-3 p-3 ${color} text-white rounded-xl shadow-md mb-4`}>
    <Icon size={24} />
    <h3 className="text-xl font-bold">{title}</h3>
  </div>
);

const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4 ${className}`}>
    {children}
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="animate-fadeIn">
            <SectionTitle icon={Info} title="訪韓三大方向" color="bg-indigo-600" />
            <div className="space-y-4">
              {[
                { id: 1, text: "透過見證交流得著力量與火，領受屬天構想進行奔跑之年。" },
                { id: 2, text: "與聖三位、耶穌和老師以魂以靈相通見面。" },
                { id: 3, text: "透過校園聖地巡禮，更加體會與主一起奔跑的深刻故事與意義。" }
              ].map((goal) => (
                <div key={goal.id} className="flex gap-4 items-start bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                  <span className="bg-pink-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {goal.id}
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium">{goal.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
                <SectionTitle icon={Plane} title="航班資訊" color="bg-sky-500" />
                {FLIGHTS.map((f, idx) => (
                    <Card key={idx} className="relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white rounded-bl-xl ${idx === 0 ? 'bg-green-500' : 'bg-orange-500'}`}>
                            {f.type}
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-2xl font-bold text-blue-700">{f.date}</span>
                            <span className="text-lg font-mono font-semibold bg-slate-100 px-2 py-1 rounded">{f.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3 text-slate-800 font-bold">
                            <MapPin size={18} className="text-red-500" />
                            {f.route}
                        </div>
                        <div className="text-sm text-slate-500 space-y-1">
                            <p>航廈：{f.terminal}</p>
                            <p>航空公司：{f.airline}</p>
                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 font-bold flex items-center gap-2">
                                <AlertTriangle size={16} />
                                {f.meet}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="animate-fadeIn">
            <SectionTitle icon={Calendar} title="月明洞行程表" color="bg-emerald-600" />
            <div className="space-y-6 pb-20">
              {SCHEDULE.map((day, dIdx) => (
                <div key={dIdx}>
                  <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-md py-2 mb-3 border-b-2 border-emerald-500 flex items-center justify-between">
                    <h4 className="text-xl font-black text-emerald-800">{day.day}</h4>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">DAY {dIdx + 1}</span>
                  </div>
                  <div className="space-y-3">
                    {day.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex gap-4 group">
                        <div className="w-24 text-sm font-bold text-slate-400 mt-1 flex-shrink-0 group-hover:text-emerald-500 transition-colors">
                          {item.time}
                        </div>
                        <div className="flex-grow pb-3 border-b border-slate-100 group-last:border-0">
                          <h5 className="font-bold text-slate-800">{item.title}</h5>
                          {item.detail && <p className="text-sm text-slate-500 mt-1">{item.detail}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'packing':
        return (
          <div className="animate-fadeIn">
            <SectionTitle icon={Briefcase} title="攜帶物品" color="bg-orange-500" />
            <Card className="bg-red-50 border-red-200 mb-6">
                <h4 className="text-red-600 font-black mb-3 flex items-center gap-2">
                    <AlertTriangle size={20} /> 必備物品！
                </h4>
                <ul className="space-y-3">
                    {PACKING_LIST.must.map((item, i) => (
                        <li key={i} className="flex gap-3 items-center">
                            <input type="checkbox" className="w-5 h-5 rounded border-red-300 text-red-500" />
                            <span className="text-slate-800 font-bold">{item}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            <h4 className="text-slate-700 font-bold mb-4 flex items-center gap-2">
                可依個人需求增減
            </h4>
            <div className="space-y-2 mb-20">
                {PACKING_LIST.personal.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center p-3 bg-white rounded-xl shadow-sm">
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-orange-500" />
                        <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                ))}
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="animate-fadeIn space-y-6 pb-20">
            <div>
                <SectionTitle icon={Home} title="住宿注意事項" color="bg-teal-600" />
                <Card className="text-sm space-y-4">
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        <li><strong>基本提供：</strong>免費WIFI、礦泉水、毛巾、吹風機等。</li>
                        <li className="text-red-500 font-bold underline">不提供拋棄式個人盥洗用品。</li>
                        <li><strong>充電器：</strong>一樓櫃台借用，損壞/遺失賠償 10,000 韓幣。</li>
                        <li><strong>房卡：</strong>遺失賠償 20,000 韓幣。</li>
                        <li><strong>全面禁菸：</strong>罰款 50,000 韓幣。</li>
                        <li><strong>洗衣：</strong>B1 投幣式，06:00~18:00 (洗衣精可於櫃台購買)。</li>
                    </ul>
                </Card>
                <Card className="bg-teal-50 border-teal-200">
                    <h5 className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                        <Coffee size={18} /> 大屯山三溫暖
                    </h5>
                    <p className="text-sm text-slate-700">地點：飯店 B1</p>
                    <p className="text-sm text-slate-700">費用：房客優惠 5,000 韓幣 (原價 10,000)</p>
                    <p className="text-sm text-slate-700">時間：06:00~20:00 (最後入場 19:00)</p>
                </Card>
            </div>

            <div>
                <SectionTitle icon={Navigation} title="月明洞規範" color="bg-rose-500" />
                <Card className="text-sm space-y-4 border-rose-100">
                    <div className="p-3 bg-rose-50 text-rose-800 rounded-lg font-bold">
                        🚫 禁止個人&團體照片拍攝以及攝影！
                    </div>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li><strong>禁行區域：</strong>白寶座石頭造景、禱告山神之路、誕生紀念館旁小路。</li>
                        <li><strong>草坪區：</strong>切勿鋪「塑膠地墊」，進入需脫鞋。</li>
                        <li><strong>山泉水：</strong>請勿使用兩公升以上瓶子盛裝。</li>
                        <li><strong>垃圾：</strong>請大家做好垃圾分類！</li>
                    </ul>
                </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-24">
      <Header />
      <div className="px-5">
        {renderContent()}
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-2xl shadow-2xl">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Home size={24} />
          <span className="text-xs font-bold">首頁</span>
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'schedule' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Calendar size={24} />
          <span className="text-xs font-bold">行程</span>
        </button>
        <button 
          onClick={() => setActiveTab('packing')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'packing' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Briefcase size={24} />
          <span className="text-xs font-bold">行李</span>
        </button>
        <button 
          onClick={() => setActiveTab('info')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'info' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Info size={24} />
          <span className="text-xs font-bold">須知</span>
        </button>
      </nav>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
