const About = () => {
  const teamMembers = [
    {
      name: '陳小明',
      title: '創辦人兼執行長',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      description: '擁有超過15年的科技產業經驗，致力於為消費者帶來最優質的購物體驗。'
    },
    {
      name: '林小華',
      title: '技術總監',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      description: '資深全端工程師，專注於建立安全、高效能的電商平台。'
    },
    {
      name: '王小美',
      title: '產品經理',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      description: '擁有豐富的產品管理經驗，致力於優化用戶體驗和產品功能。'
    }
  ];

  const companyValues = [
    {
      title: '品質保證',
      description: '我們嚴格把關每一項商品，確保顧客收到的都是最優質的產品。',
      icon: (
        <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: '顧客至上',
      description: '以顧客需求為核心，提供最好的服務和購物體驗。',
      icon: (
        <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      title: '創新科技',
      description: '持續創新，運用最新科技提升購物體驗。',
      icon: (
        <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 公司簡介 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          關於我們
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          科技商城成立於2020年，致力於為台灣消費者提供最優質的科技產品。
          我們相信科技能夠改善人們的生活，因此我們精心挑選每一項商品，
          確保顧客能夠買到最好的產品。
        </p>
      </div>

      {/* 核心價值 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          我們的核心價值
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyValues.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 團隊成員 */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          我們的團隊
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-3">
                {member.title}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
