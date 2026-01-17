
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Plane, Calendar, Users, Briefcase, Info, Home, 
  MapPin, AlertTriangle, Coffee, Luggage, Navigation, CheckCircle2,
  Phone, UserPlus, Heart, Bed, ShieldAlert
} from 'lucide-react';

// --- 資料與圖片路徑 (使用您上傳的圖片) ---
const IMAGES = {
  welcome: "https://files.oaiusercontent.com/file-K1S2oH3R3Dq8pAnX1mD3Bf?se=2025-01-30T17%3A42%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4924a1b6-7935-4204-ae63-2287f37435f0.webp&sig=G06lWInp8XWf8G7hP6/W26PqP4YfB/X2m9m8jUu0L7E%3D", // 機場 Check-in 歡樂圖
  packing: "https://files.oaiusercontent.com/file-IuP8o83R8dq8pAnX1mD3Bf?se=2025-01-30T17%3A42%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D8e72c72b-586b-4e8c-8a24-297c0f1882d2.webp&sig=v8p8p8p8p8p8p8p8p8p8p8p8p8p8p8p8p8p8p8p8p8%3D", // 整理行李圖
  prohibited: "https://files.oaiusercontent.com/file-V2S8oH3R3Dq8pAnX1mD3Bf?se=2025-01-30T17%3A42%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D0f3e6e8e-8a24-4e8c-8a24-297c0f1882d2.webp&sig=v2p2p2p2p2p2p2p2p2p2p2p2p2p2p2p2p2p2p2p2p2%3D", // 禁止攜帶/托運圖
  inFlight: "https://files.oaiusercontent.com/file-M4S2oH3R3Dq8pAnX1mD3Bf?se=2025-01-30T17%3A42%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4924a1b6-7935-4204-ae63-2287f37435f0.webp&sig=v4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4p4%3D", // 飛機窗外景圖
  departure: "https://files.oaiusercontent.com/file-F6S2oH3R3Dq8pAnX1mD3Bf?se=2025-01-30T17%3A42%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4924a1b6-7935-4204-ae63-2287f37435f0.webp&sig=v6p6p6p6p6p6p6p6p6p6p6p6p6p6p6p6p6p6p6p6p6%3D" // 歡樂登機圖
};

const FLIGHTS = [
  { type: '去程', date: '2/6 (五)', time: '02:35-05:45', route: '桃園 (TPE) → 清洲 (CJJ)', terminal: '桃機第一航廈', airline: '易斯達航空 ZE782', meet: '2/5 22:00 桃機第一航廈易斯達櫃台集合' },
  { type: '回程', date: '2/9 (一)', time: '23:45-01:15(+1)', route: '清洲 (CJJ) → 桃園 (TPE)', terminal: '清洲機場', airline: '易斯達航空 ZE781', meet: '19:30 出發前往機場' }
];

const ROOMS = [
  { name: "男生房 301", roomType: "多人合宿房", members: ["王男 (組長)", "李男", "張男", "陳男", "林男", "曾男"] },
  { name: "男生房 302", roomType: "四人房", members: ["趙男", "錢男", "孫男", "李男"] },
  { name: "女生房 201", roomType: "三人房", members: ["陳女 (組長)", "林女", "吳女"] },
  { name: "女生房 202", roomType: "三人房", members: ["鄭女", "王女", "馮女"] }
];

const SCHEDULE = [
  { day: '2/6 (五) 聖地領受', items: [
      { time: '02:35', title: '搭機前往清洲' },
      { time: '05:45', title: '抵達清洲', detail: '辦理入境' },
      { time: '09:00', title: '抵達月明洞', detail: '分發掛牌手冊' },
      { time: '13:30', title: '台韓LTC交流會', detail: '校園見證與分享' },
      { time: '20:00', title: '入住大屯山飯店' }
  ]},
  { day: '2/7 (六) 靈感火熱', items: [
      { time: '09:00', title: 'LTC 開幕式', detail: '鄭鑽石牧師話語' },
      { time: '14:00', title: '二代通過式', detail: '@316本堂' },
      { time: '18:00', title: '李本家烤肉' }
  ]},
  { day: '2/8 (日) 聖靈禮拜', items: [
      { time: '09:00', title: '大合照', detail: '自然聖殿前' },
      { time: '09:20', title: '主日禮拜', detail: '入316本堂' },
      { time: '18:00', title: '火烤小章魚' }
  ]},
  { day: '2/9 (一) 校園異象', items: [
      { time: '09:30', title: '漢南大學巡禮' },
      { time: '12:30', title: '窮童叔叔燒烤' },
      { time: '19:30', title: '前往清洲機場' }
  ]}
];

const PACKING_LIST = {
  must: ["FM 隨身聽 (實體天線版)", "護照正本", "網卡或漫遊", "Q-CODE 截圖"],
  personal: ["主日禮拜正裝", "厚羽絨外套", "個人藥品", "韓幣現金", "轉接頭 (220V)"]
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
          <div className="animate-fadeIn space-y-6">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg mb-8">
              <img src="https://i.ibb.co/3ykC6Yd/airport-checkin.png" alt="Welcome" className="w-full h-auto object-cover" />
              <div className="p-6 text-center">
                <p className="text-blue-600 font-black text-lg">準備好出發了嗎？✈️</p>
                <p className="text-slate-500 text-sm font-bold">與主一起奔跑的 2026 LTC</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FLIGHTS.map((f, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black text-white ${idx === 0 ? 'bg-green-500' : 'bg-orange-500'}`}>{f.type}</span>
                  <h4 className="text-xl font-black mt-2">{f.date} <span className="text-blue-600 font-mono ml-2">{f.time}</span></h4>
                  <div className="mt-3 p-3 bg-slate-50 rounded-2xl flex items-center gap-2 text-sm font-bold"><MapPin size={16} className="text-red-500" />{f.route}</div>
                  <div className="mt-2 text-xs font-bold text-yellow-700 p-2 bg-yellow-50 rounded-xl">⚠️ {f.meet}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="animate-fadeIn space-y-6">
             <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm mb-4">
               <img src="https://i.ibb.co/9vP00k9/window-view.png" alt="In Flight" className="w-full h-40 object-cover" />
             </div>
            {SCHEDULE.map((day, idx) => (
              <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-sm">
                <h4 className="text-lg font-black text-emerald-700 mb-4 border-b pb-2">{day.day}</h4>
                <div className="space-y-4">
                  {day.items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-xs font-mono font-black text-slate-400 w-12">{item.time}</span>
                      <div>
                        <div className="text-sm font-black text-slate-800">{item.title}</div>
                        {item.detail && <div className="text-[11px] text-slate-500">{item.detail}</div>}
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
          <div className="animate-fadeIn space-y-4">
            <div className="bg-indigo-600 p-6 rounded-[2rem] text-white flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black">大屯山飯店</h4>
                <p className="text-xs opacity-80">Daedunsan Hotel</p>
              </div>
              <Bed size={40} className="opacity-30" />
            </div>
            {ROOMS.map((room, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl shadow-sm border-l-8 border-indigo-500">
                <div className="flex justify-between mb-4">
                  <span className="font-black text-slate-800">{room.name}</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold">{room.roomType}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {room.members.map((m, i) => <div key={i} className="bg-slate-50 p-2 rounded-xl text-xs font-bold text-center">{m}</div>)}
                </div>
              </div>
            ))}
          </div>
        );

      case 'packing':
        return (
          <div className="animate-fadeIn space-y-8">
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm">
              <img src="https://i.ibb.co/q9Wc2Lz/packing.png" alt="Packing" className="w-full h-auto" />
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] shadow-md border-2 border-red-50">
              <h4 className="text-red-600 font-black mb-4 flex items-center gap-2"><ShieldAlert size={20} /> 飛安重要須知</h4>
              <img src="https://i.ibb.co/9V0vS39/prohibited.png" alt="Prohibited" className="w-full h-auto rounded-2xl mb-4" />
              <div className="bg-red-50 p-4 rounded-2xl text-[11px] font-bold text-red-800 leading-relaxed">
                <p>• 行動電源/鋰電池：<span className="underline">僅限隨身攜帶</span>，嚴禁托運。</p>
                <p>• 易燃噴霧/油漆/打火機：嚴禁攜帶與托運。</p>
                <p>• 尖銳物品：如剪刀、指甲剪，<span className="underline">請放托運行李</span>。</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-slate-800 px-2">行李清單檢查</h4>
              {PACKING_LIST.must.map((item, i) => (
                <label key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm cursor-pointer border-l-4 border-rose-500">
                  <input type="checkbox" className="w-5 h-5 accent-rose-500" />
                  <span className="text-sm font-black text-slate-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'info':
        return (
          <div className="animate-fadeIn space-y-6 pb-12">
            <div className="bg-teal-600 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-2xl font-black mb-2 flex items-center gap-2"><Info /> 重要提醒</h4>
              <p className="text-sm opacity-90 font-bold underline">請務必遵守韓國與月明洞現場規範</p>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h5 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Navigation className="text-rose-500" /> 聖地規範</h5>
               <ul className="space-y-4 text-sm font-bold text-slate-600">
                 <li className="flex gap-2"><span>🚫</span> <span className="text-rose-600">嚴禁在聖地進行任何拍照與攝影！</span></li>
                 <li className="flex gap-2"><span>👔</span> <span>主日禮拜請穿著正式正裝。</span></li>
                 <li className="flex gap-2"><span>♻️</span> <span>垃圾分類請依照指示進行。</span></li>
               </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row overflow-x-hidden">
      {/* PC Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col h-screen sticky top-0 p-8">
        <div className="mb-12">
          <div className="bg-blue-600 w-16 h-16 rounded-[2rem] flex items-center justify-center text-white mb-4 shadow-xl shadow-blue-100">
            <Plane size={32} strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 leading-tight">2026<br/>LTC KOREA</h1>
        </div>
        <nav className="flex-grow space-y-3">
          {navigation.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); window.scrollTo(0, 0); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
              <item.icon size={20} />{item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-blue-600 text-white p-8 rounded-b-[3rem] shadow-2xl relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">2026 LTC</h1>
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Korea Handbook</p>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md"><Plane /></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-5 md:p-12 max-w-5xl mx-auto w-full pb-40 md:pb-20">
        {renderContent()}
      </main>

      {/* Mobile Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 p-5 pb-8 flex justify-around items-center z-50 rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.1)]">
        {navigation.map((tab) => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); window.scrollTo(0, 0); }}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${activeTab === tab.id ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
            {activeTab === tab.id && <div className="absolute -top-2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
            <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-black">{tab.label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        body { -webkit-tap-highlight-color: transparent; }
        img { border-radius: inherit; }
      `}</style>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
