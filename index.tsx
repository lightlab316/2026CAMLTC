
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Plane, Calendar, Users, Briefcase, Info, Home, 
  MapPin, AlertTriangle, Coffee, Luggage, Navigation 
} from 'lucide-react';

// --- 資料定義 ---
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
    "個人藥品 (防蚊、止痛、暈車等)",
    "錢包、零用錢 (韓幣)",
    "雨傘、雨衣",
    "隨身背包",
    "布拖鞋 (進316館使用)",
    "羽絨暖套+手套+圍巾",
    "行動電源 (FM隨身聽電池)",
    "個人保養與保濕用品",
    "主日禮拜正裝"
  ]
};

// --- UI 元件 ---
const Header = () => (
  <div className="bg-blue-600 text-white p-8 text-center rounded-b-3xl shadow-xl mb-6">
    <h1 className="text-4xl font-bold mb-2">2026 大學部 LTC</h1>
    <h2 className="text-2xl font-medium mb-4 italic">訪韓手冊</h2>
    <div className="inline-block bg-red-800 px-4 py-1 rounded-full text-sm font-bold shadow-inner">
      2/6 ~ 2/9
    </div>
    <div className="mt-6 flex justify-center">
        <div className="relative">
            <div className="w-20 h-20 bg-pink-300 rounded-full border-4 border-white overflow-hidden flex items-center justify-center">
                 <span className="text-4xl">✈️</span>
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
                { id: 1, text: "透過見證交流得著力量與火，領受屬天構想。" },
                { id: 2, text: "與聖三位、耶穌和老師以魂以靈相通見面。" },
                { id: 3, text: "透過校園聖地巡禮，體會與主奔跑的故事。" }
              ].map((goal) => (
                <div key={goal.id} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500">
                  <span className="bg-indigo-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {goal.id}
                  </span>
                  <p className="text-slate-700 font-medium">{goal.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
                <SectionTitle icon={Plane} title="航班資訊" color="bg-sky-500" />
                {FLIGHTS.map((f, idx) => (
                    <Card key={idx} className="relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-bold text-blue-700">{f.date} {f.type}</span>
                            <span className="text-xs font-mono font-semibold bg-slate-100 px-2 py-1 rounded">{f.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-slate-800 font-bold">
                            <MapPin size={18} className="text-red-500" />
                            {f.route}
                        </div>
                        <div className="text-sm text-slate-500">
                            <p>航廈：{f.terminal}</p>
                            <p>航班：{f.airline}</p>
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
          <div className="animate-fadeIn pb-24">
            <SectionTitle icon={Calendar} title="行程表" color="bg-emerald-600" />
            {SCHEDULE.map((day, dIdx) => (
              <div key={dIdx} className="mb-6">
                <h4 className="text-lg font-bold text-emerald-800 border-b-2 border-emerald-500 mb-3 flex justify-between items-center">
                  <span>{day.day}</span>
                  <span className="text-xs bg-emerald-100 px-2 py-0.5 rounded-full">DAY {dIdx+1}</span>
                </h4>
                <div className="space-y-4">
                  {day.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex gap-4">
                      <div className="w-20 text-sm font-bold text-slate-400 pt-0.5">{item.time}</div>
                      <div className="flex-grow">
                        <div className="font-bold text-slate-800">{item.title}</div>
                        {item.detail && <div className="text-xs text-slate-500 mt-1 bg-slate-50 p-1 rounded">{item.detail}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'packing':
        return (
          <div className="animate-fadeIn pb-24">
            <SectionTitle icon={Briefcase} title="攜帶物品" color="bg-orange-500" />
            <Card className="bg-red-50 border-red-100">
              <h4 className="text-red-600 font-bold mb-3 flex items-center gap-2">
                <AlertTriangle size={18} /> 必備清單
              </h4>
              <div className="space-y-2">
                {PACKING_LIST.must.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 accent-red-500" />
                    <span className="text-sm font-bold text-slate-800">{item}</span>
                  </label>
                ))}
              </div>
            </Card>
            <div className="mt-4 space-y-2">
              <h4 className="text-slate-600 font-bold px-1 mb-2">個人用品</h4>
              {PACKING_LIST.personal.map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-slate-300 accent-blue-500" />
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="animate-fadeIn pb-24 space-y-4">
            <SectionTitle icon={Info} title="注意事項" color="bg-teal-600" />
            <Card>
              <h4 className="font-bold mb-2 flex items-center gap-2 text-teal-700">
                <Home size={18} /> 住宿須知 (大屯山飯店)
              </h4>
              <ul className="text-sm space-y-2 list-disc pl-5 text-slate-600">
                <li><strong>個人盥洗：</strong>飯店不提供拋棄式牙刷牙膏。</li>
                <li><strong>飯店設施：</strong>B1 三溫暖 (房客優惠 5000 韓幣)。</li>
                <li><strong>禁菸規定：</strong>全面禁菸，違者罰款 5 萬韓幣。</li>
                <li><strong>賠償：</strong>房卡遺失 2 萬，轉接頭遺失 1 萬。</li>
              </ul>
            </Card>
            <Card className="border-rose-200">
              <h4 className="font-bold text-rose-600 mb-3 flex items-center gap-2">
                <Navigation size={18} /> 月明洞現場規範
              </h4>
              <p className="text-sm text-rose-800 font-black bg-rose-50 p-3 rounded-lg mb-3">
                🚫 禁止個人或團體照片拍攝以及攝影！
              </p>
              <ul className="text-sm space-y-2 list-disc pl-5 text-slate-600">
                <li>請配合垃圾分類。</li>
                <li>進入草坪區需脫鞋，切勿鋪塑膠墊。</li>
                <li>山泉水限 600cc 以下容器盛裝。</li>
              </ul>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative">
      <Header />
      <div className="px-5">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-4 flex justify-around items-center z-50 rounded-t-3xl shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
          <Home size={22} /><span className="text-[11px] font-bold">首頁</span>
        </button>
        <button onClick={() => setActiveTab('schedule')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'schedule' ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
          <Calendar size={22} /><span className="text-[11px] font-bold">行程</span>
        </button>
        <button onClick={() => setActiveTab('packing')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'packing' ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
          <Briefcase size={22} /><span className="text-[11px] font-bold">行李</span>
        </button>
        <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'info' ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
          <Info size={22} /><span className="text-[11px] font-bold">須知</span>
        </button>
      </nav>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

// --- 執行渲染 ---
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
