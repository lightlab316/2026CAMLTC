
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Plane, Calendar, Users, Briefcase, Info, Home, 
  MapPin, AlertTriangle, Coffee, Luggage, Navigation, CheckCircle2,
  Phone, UserPlus, Heart, Bed, ChevronRight, Menu, X
} from 'lucide-react';

// --- 資料定義 ---

const FLIGHTS = [
  { type: '去程', date: '2/6 (五)', time: '02:35-05:45', route: '桃園 (TPE) → 清洲 (CJJ)', terminal: '桃機第一航廈', airline: '易斯達航空 ZE782', meet: '2/5 22:00 桃機第一航廈易斯達櫃台集合' },
  { type: '回程', date: '2/9 (一)', time: '23:45-01:15(+1)', route: '清洲 (CJJ) → 桃園 (TPE)', terminal: '清洲機場', airline: '易斯達航空 ZE781', meet: '19:30 出發前往機場' }
];

const ROOMS = [
  { name: "男生房 301", roomType: "多人合宿房", members: ["王男 (組長)", "李男", "張男", "陳男", "林男", "曾男"] },
  { name: "男生房 302", roomType: "四人房", members: ["趙男", "錢男", "孫男", "李男"] },
  { name: "女生房 201", roomType: "三人房", members: ["陳女 (組長)", "林女", "吳女"] },
  { name: "女生房 202", roomType: "三人房", members: ["鄭女", "王女", "馮女"] },
  { name: "女生房 203", roomType: "雙人房", members: ["蔣女", "沈女"] }
];

const SCHEDULE = [
  {
    day: '2/6 (五) 聖地領受',
    items: [
      { time: '02:35', title: '搭機前往清洲' },
      { time: '05:45', title: '抵達清洲機場', detail: '辦理入境、提取行李' },
      { time: '07:30', title: '搭乘專車出發', detail: '清洲機場巴士停靠站' },
      { time: '09:00', title: '抵達月明洞', detail: '分發掛牌與手冊' },
      { time: '10:00', title: '特講：屬天構想', detail: '律師特講 OR 宋代表分享' },
      { time: '12:00', title: '午餐：真美便當', detail: '@316餐廳' },
      { time: '13:30', title: '台韓LTC交流會', detail: '校園見證分享、小組交流、禱告會' },
      { time: '18:00', title: '晚餐：好口味', detail: '月明洞外餐廳' },
      { time: '20:00', title: '入住大屯山飯店', detail: '晚間分享與小組禱告' }
    ]
  },
  {
    day: '2/7 (六) 靈感火熱',
    items: [
      { time: '07:00', title: '飯店早餐', detail: '大屯山飯店 B1' },
      { time: '09:00', title: 'LTC 開幕', detail: 'CAM 中央話語：鄭鑽石牧師' },
      { time: '12:30', title: '午餐：真美便當', detail: '@316餐廳' },
      { time: '14:00', title: '韓國二代通過式', detail: '@316本堂' },
      { time: '18:00', title: '晚餐：李本家', detail: '發放 10,000 韓幣買隔日早餐' },
      { time: '21:00', title: '回飯店休息', detail: '分享今日領受' }
    ]
  },
  {
    day: '2/8 (日) 聖靈禮拜',
    items: [
      { time: '07:30', title: '早餐自理', detail: '使用昨晚預購食物' },
      { time: '09:00', title: '全體大合照', detail: '自然聖殿前' },
      { time: '09:20', title: '主日禮拜', detail: '入 316 本堂' },
      { time: '12:30', title: '午餐：真美便當', detail: '@316餐廳' },
      { time: '14:00', title: '二代中央分享', detail: '校園宣教異象' },
      { time: '18:00', title: '晚餐：火烤小章魚' },
      { time: '20:30', title: '晚間整理行李' }
    ]
  },
  {
    day: '2/9 (一) 校園異象',
    items: [
      { time: '08:15', title: '飯店退房', detail: '大廳集合' },
      { time: '09:30', title: '漢南大學巡禮', detail: '校園異象傳承' },
      { time: '11:00', title: '忠南大學巡禮', detail: '校園異象傳承' },
      { time: '12:30', title: '午餐：燒烤', detail: '窮童叔叔燒烤店' },
      { time: '17:30', title: '晚餐自理', detail: '機場商圈或大學附近' },
      { time: '19:30', title: '前往清洲機場', detail: '準備返台' }
    ]
  }
];

const PACKING_LIST = {
  must: [
    "FM 隨身聽 (實體天線版，翻譯必備)",
    "護照正本 (效期半年以上)",
    "韓國網卡或開通國際漫遊",
    "Q-CODE/K-ETA 截圖"
  ],
  personal: [
    "主日禮拜正裝 (西裝/裙裝)",
    "厚羽絨衣、手套、圍巾 (低溫預警)",
    "個人必備藥品",
    "韓幣現金 (建議 15 萬以上)",
    "布拖鞋 (室內、316館使用)",
    "個人盥洗用品 (牙刷牙膏)",
    "保濕護膚品 (韓國乾燥)",
    "韓規轉接頭 (220V 圓孔)",
    "600cc 以下空水瓶"
  ]
};

// --- UI 元件 ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navigation = [
    { id: 'home', icon: Home, label: '概覽' },
    { id: 'schedule', icon: Calendar, label: '行程' },
    { id: 'rooms', icon: Bed, label: '分房' },
    { id: 'packing', icon: Briefcase, label: '行李' },
    { id: 'info', icon: Info, label: '須知' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="animate-fadeIn space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { id: "01", text: "得著力量與火，領受屬天構想進行奔跑之年。", color: "border-indigo-500", bg: "bg-indigo-50" },
                { id: "02", text: "與聖三位、耶穌和老師以魂以靈相通見面。", color: "border-pink-500", bg: "bg-pink-50" },
                { id: "03", text: "透過校園聖地巡禮，體會與主奔跑的故事。", color: "border-blue-500", bg: "bg-blue-50" }
              ].map((goal) => (
                <div key={goal.id} className={`flex gap-4 items-center p-5 md:p-6 rounded-3xl border-l-8 shadow-sm ${goal.color} ${goal.bg}`}>
                  <span className="text-3xl md:text-4xl font-black opacity-20">{goal.id}</span>
                  <p className="font-bold text-slate-800 leading-tight text-sm md:text-base">{goal.text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {FLIGHTS.map((f, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-5 md:p-6 shadow-md border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all">
                  <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-5 group-hover:scale-150 transition-transform ${idx === 0 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black text-white ${idx === 0 ? 'bg-green-500' : 'bg-orange-500'}`}>
                      {f.type}
                    </span>
                    <span className="font-mono font-black text-blue-600 text-sm md:text-base">{f.time}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-slate-800 mb-3">{f.date}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-700 font-bold bg-slate-50 p-3 rounded-2xl text-sm md:text-base">
                      <MapPin size={18} className="text-red-500" />
                      {f.route}
                    </div>
                    <div className="text-[12px] md:text-sm font-bold text-yellow-800 bg-yellow-50 p-3 rounded-2xl border border-yellow-100">
                      ⚠️ {f.meet}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {SCHEDULE.map((day, dIdx) => (
              <div key={dIdx} className="bg-white p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-50">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-emerald-500 text-white w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-sm md:text-base">
                    {dIdx + 1}
                  </span>
                  <h4 className="text-lg md:text-xl font-black text-slate-800">{day.day}</h4>
                </div>
                <div className="space-y-5 md:space-y-6">
                  {day.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex gap-4 relative group">
                      <div className="w-14 md:w-16 text-[10px] md:text-xs font-black text-slate-400 font-mono mt-1 flex-shrink-0">{item.time}</div>
                      <div className="flex-grow">
                        <div className="font-black text-slate-800 text-sm md:text-base group-hover:text-emerald-600 transition-colors">{item.title}</div>
                        {item.detail && <div className="text-[11px] md:text-xs text-slate-500 mt-1 leading-relaxed">{item.detail}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'rooms':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {ROOMS.map((room, rIdx) => (
              <div key={rIdx} className="bg-white rounded-3xl p-5 md:p-6 shadow-md border-t-8 border-purple-500">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-base md:text-lg font-black text-slate-800 flex items-center gap-2">
                    <Bed size={20} className="text-purple-500" /> {room.name}
                  </h4>
                  <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold">{room.roomType}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {room.members.map((member, mIdx) => (
                    <div key={mIdx} className="p-3 bg-slate-50 rounded-2xl text-[11px] md:text-xs font-bold text-slate-600 text-center hover:bg-purple-50 transition-colors">
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'packing':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-rose-50 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border-2 border-rose-100">
              <h4 className="text-lg md:text-xl font-black text-rose-600 mb-6 flex items-center gap-2">
                <AlertTriangle /> 必帶項目
              </h4>
              <div className="space-y-3 md:space-y-4">
                {PACKING_LIST.must.map((item, i) => (
                  <label key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm cursor-pointer hover:bg-rose-50 transition-colors border border-transparent active:scale-95 transition-transform">
                    <input type="checkbox" className="w-5 h-5 md:w-6 md:h-6 rounded-lg accent-rose-500" />
                    <span className="font-black text-slate-700 text-xs md:text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg md:text-xl font-black text-slate-800 mb-4 px-2">個人用品清單</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                {PACKING_LIST.personal.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-50 cursor-pointer hover:border-blue-200 active:scale-95 transition-all">
                    <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded-lg accent-blue-500" />
                    <span className="text-xs md:text-sm font-bold text-slate-600">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-slate-100">
              <h4 className="text-xl md:text-2xl font-black text-teal-800 mb-6 flex items-center gap-2">
                <Home /> 飯店須知
              </h4>
              <ul className="space-y-5 md:space-y-6">
                {[
                  { t: "自備洗漱", d: "韓國不提供一次性牙刷牙膏，請務必自帶。" },
                  { t: "飯店禁菸", d: "室內全面禁菸，違者罰款 50,000 韓幣。" },
                  { t: "三溫暖", d: "B1 三溫暖房客優惠價 5,000 韓幣。" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="text-teal-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block font-black text-slate-800 text-sm md:text-base">{item.t}</span>
                      <span className="text-[11px] md:text-sm text-slate-500">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-600 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white shadow-xl shadow-rose-200">
              <h4 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2">
                <Navigation /> 月明洞規範
              </h4>
              <div className="bg-white/20 p-4 rounded-2xl mb-6 font-black text-center text-[12px] md:text-sm">
                🚫 嚴格禁止拍照、攝影！
              </div>
              <ul className="space-y-4 text-xs md:text-sm font-bold">
                <li className="flex gap-2"><span>•</span> <span>主日禮拜請穿著正裝 (西裝/套裝)。</span></li>
                <li className="flex gap-2"><span>•</span> <span>進入草坪需脫鞋，嚴禁鋪塑膠墊。</span></li>
                <li className="flex gap-2"><span>•</span> <span>垃圾分類請務必配合。</span></li>
                <li className="flex gap-2"><span>•</span> <span>山泉水空瓶限 600cc 以下。</span></li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col md:flex-row overflow-x-hidden">
      
      {/* PC 版側邊導覽列 */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col h-screen sticky top-0 z-50 p-6">
        <div className="mb-10">
          <div className="bg-blue-600 p-4 rounded-3xl text-white mb-4 shadow-lg shadow-blue-200 inline-block">
            <Plane size={32} strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter">2026 LTC</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Korea Handbook</p>
        </div>
        
        <nav className="flex-grow space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo(0, 0);
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl text-[10px] font-bold text-slate-400">
          最後更新：2026.02.01
        </div>
      </aside>

      {/* 手機版頂部 Header */}
      <header className="md:hidden bg-blue-600 text-white p-6 rounded-b-[2.5rem] shadow-xl text-center relative z-10">
        <h1 className="text-2xl font-black mb-1">2026 大學部 LTC</h1>
        <div className="text-xs font-bold opacity-80 uppercase tracking-widest mb-4">Handbook</div>
        <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-1 rounded-full text-[10px] font-black shadow-lg">
          <Calendar size={12} /> FEB 06 — 09
        </div>
      </header>

      {/* 主內容區：增加底部 padding (pb-32) 避免被手機導覽列擋住 */}
      <main className="flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full pb-32 md:pb-12">
        {renderContent()}
      </main>

      {/* 手機版底部導覽列 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 pb-6 flex justify-around items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        {navigation.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              window.scrollTo(0, 0);
            }} 
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${activeTab === tab.id ? 'text-blue-600 scale-110' : 'text-slate-400'}`}
          >
            {activeTab === tab.id && <div className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"></div>}
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[9px] font-black tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fadeIn { 
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
        body { 
          -webkit-tap-highlight-color: transparent; 
          overscroll-behavior-y: none;
        }
        /* 隱藏捲軸但保留功能 */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

// --- 渲染 ---
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
