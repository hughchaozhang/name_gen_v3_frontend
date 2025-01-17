import { Hono } from 'hono'
import { renderer } from './renderer'

// 示例卡片数据
const EXAMPLE_CARD = {
  englishName: "Jennifer Aniston",
  chineseName: "简安怡",
  pinyin: "Jiǎn Ān Yí",
  meaning: "简取自的谐音，安怡寓意安宁愉悦。安象征平安顺遂，怡取自《诗经》怡然自得，表达内心平和、悠然自得的状态。",
  culturalReference: "融合了道家清静无为的处世哲学和儒家修身养性的智慧，体现了对内心安宁与生活和谐的追求。",
  englishMeaning: "A name that reflects a serene and contented state of mind, embodying the pursuit of inner peace and harmony in life"
}

const app = new Hono()

app.use(renderer)

// 主页面组件
const HomePage = () => {
  return (
    <div class="container">
      {/* 头部区域 */}
      <header class="header">
        <div class="header-left">
          <img src="/static/logo.png" alt="Name Wok Logo" class="logo" />
          <h1 class="site-title">Name Wok</h1>
        </div>
        <div class="name-counter">
          已生成 <span class="counter-number" id="nameCounter">0</span> 个名字
        </div>
      </header>

      {/* 输入区域 */}
      <section class="input-section">
        <div class="input-container">
          <input
            type="text"
            class="name-input"
            placeholder="Enter your English name, eg: Jennifer Aniston..."
            id="nameInput"
          />
          <button class="submit-button" id="generateButton">
            Generate Names
          </button>
        </div>
      </section>

      {/* 加载动画区域 */}
      <div class="loading-container" id="loadingContainer">
        <div class="loading-spinner"></div>
        <div class="loading-text" id="loadingText"></div>
      </div>

      {/* 示例卡片区域 */}
      <section class="cards-container">
        <div class="name-card">
          <button class="copy-button" data-name={EXAMPLE_CARD.chineseName} data-pinyin={EXAMPLE_CARD.pinyin}>
            Copy
          </button>
          <div class="english-name">{EXAMPLE_CARD.englishName}</div>
          <h3>{EXAMPLE_CARD.chineseName} ({EXAMPLE_CARD.pinyin})</h3>
          
          <div class="card-section">
            <h4>含义解释</h4>
            <p>{EXAMPLE_CARD.meaning}</p>
          </div>
          
          <div class="card-section">
            <h4>文化内涵</h4>
            <p>{EXAMPLE_CARD.culturalReference}</p>
          </div>
          
          <div class="card-section">
            <h4>English Meaning</h4>
            <p>{EXAMPLE_CARD.englishMeaning}</p>
          </div>
        </div>
      </section>

      {/* 客户端脚本 */}
      <script dangerouslySetInnerHTML={{__html: `
        // 名字计数器
        let totalNames = 53;
        const nameCounter = document.getElementById('nameCounter');

        // 获取实际的名字生成总数
        async function fetchTotalNames() {
          try {
            const response = await fetch('https://name-gen-v3.hughzhang.workers.dev/api/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ firstName: 'John' })  // 使用示例名字获取总数
            });
            const data = await response.json();
            if (data.totalNamesGenerated !== undefined) {
              totalNames = data.totalNamesGenerated;
              nameCounter.textContent = totalNames;
            }
          } catch (error) {
            console.error('Error fetching total names:', error);
          }
        }

        // 页面加载时获取总数
        fetchTotalNames();

        function updateNameCounter(newTotal) {
          if (newTotal !== undefined && newTotal > totalNames) {
            totalNames = newTotal;
            nameCounter.textContent = totalNames;
            
            // 添加动画效果
            nameCounter.style.transform = 'scale(1.2)';
            setTimeout(() => {
              nameCounter.style.transform = 'scale(1)';
            }, 200);
          }
        }

        // 加载提示信息
        const loadingMessages = [
          "正在解析英文名字的音韵特点...",
          "寻找最匹配的中文字符组合...",
          "融入传统文化元素...",
          "生成详细的文化解读...",
          "优化名字的整体韵律...",
          "确保名字的文化内涵...",
          "Crafting the perfect Chinese name...",
          "Analyzing cultural significance...",
          "Finding harmonious characters..."
        ];

        let currentMessageIndex = 0;
        let messageInterval;

        function showNextMessage() {
          const loadingText = document.getElementById('loadingText');
          loadingText.style.opacity = '0';
          
          setTimeout(() => {
            loadingText.textContent = loadingMessages[currentMessageIndex];
            loadingText.style.opacity = '1';
            currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
          }, 300);
        }

        // 复制功能
        document.querySelectorAll('.copy-button').forEach(button => {
          button.addEventListener('click', function() {
            const name = this.dataset.name;
            const pinyin = this.dataset.pinyin;
            const text = name + ' (' + pinyin + ')';
            
            navigator.clipboard.writeText(text).then(() => {
              const originalText = this.textContent;
              this.textContent = 'Copied!';
              setTimeout(() => {
                this.textContent = originalText;
              }, 2000);
            });
          });
        });

        // 生成名字功能
        document.getElementById('generateButton').addEventListener('click', async function() {
          const nameInput = document.getElementById('nameInput');
          const firstName = nameInput.value.trim();
          const loadingContainer = document.getElementById('loadingContainer');
          const cardsContainer = document.querySelector('.cards-container');
          
          if (!firstName) {
            alert('Please enter your name');
            return;
          }

          // 显示加载动画
          loadingContainer.classList.add('active');
          currentMessageIndex = 0;
          showNextMessage();
          messageInterval = setInterval(showNextMessage, 2000);

          // 隐藏现有卡片
          cardsContainer.style.opacity = '0';
          
          try {
            const response = await fetch('https://name-gen-v3.hughzhang.workers.dev/api/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ firstName })
            });

            const data = await response.json();
            
            // 更新计数器
            updateNameCounter(data.totalNamesGenerated);
            
            // 清除示例卡片
            cardsContainer.innerHTML = '';
            
            // 添加新卡片
            data.names.forEach(name => {
              const card = document.createElement('div');
              card.className = 'name-card';
              card.innerHTML = \`
                <button class="copy-button" data-name="\${name.chineseName}" data-pinyin="\${name.pinyin}">
                  Copy
                </button>
                <div class="english-name">\${firstName}</div>
                <h3>\${name.chineseName} (\${name.pinyin})</h3>
                <div class="card-section">
                  <h4>含义解释</h4>
                  <p>\${name.meaning}</p>
                </div>
                <div class="card-section">
                  <h4>文化内涵</h4>
                  <p>\${name.culturalReference}</p>
                </div>
                <div class="card-section">
                  <h4>English Meaning</h4>
                  <p>\${name.englishMeaning}</p>
                </div>
              \`;
              cardsContainer.appendChild(card);
            });

            // 显示新卡片
            cardsContainer.style.opacity = '1';

            // 重新绑定复制按钮事件
            document.querySelectorAll('.copy-button').forEach(button => {
              button.addEventListener('click', function() {
                const name = this.dataset.name;
                const pinyin = this.dataset.pinyin;
                const text = name + ' (' + pinyin + ')';
                
                navigator.clipboard.writeText(text).then(() => {
                  const originalText = this.textContent;
                  this.textContent = 'Copied!';
                  setTimeout(() => {
                    this.textContent = originalText;
                  }, 2000);
                });
              });
            });
          } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate names. Please try again.');
          } finally {
            // 隐藏加载动画
            clearInterval(messageInterval);
            loadingContainer.classList.remove('active');
            cardsContainer.style.opacity = '1';
          }
        });
      `}} />
    </div>
  )
}

app.get('/', (c) => {
  return c.render(<HomePage />)
})

export default app
