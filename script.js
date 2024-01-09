document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('https://lms.navaxcollege.com/exam.php');
        const data = await response.json();
        createTabs(data.data.tabs);
    } catch (error) {
        console.error('Error:', error);
    }
});

function createTabs(tabs) {
    const tabList = document.getElementById('myTabs');
    const tabContent = document.getElementById('myTabContent');

    tabs.forEach((tab, index) => {
        // Create tab title
        const tabItem = document.createElement('li');
        const tabTitle = document.createElement('span');
        tabTitle.className = 'tab-title';
        tabTitle.textContent = tab.title;
        tabItem.appendChild(tabTitle);

        tabItem.onclick = () => setActiveTab(index);
        if (index === 0) tabItem.classList.add('active');
        tabList.appendChild(tabItem);

        // Create tab content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'tab-content';
        if (index === 0) contentDiv.classList.add('active');

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        tab.body.forEach(content => {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = content;
            cardContainer.appendChild(card);
        });

        contentDiv.appendChild(cardContainer);
        tabContent.appendChild(contentDiv);
    });
}

function setActiveTab(activeIndex) {
    const tabs = document.querySelectorAll('.tabs li');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === activeIndex);
    });

    contents.forEach((content, index) => {
        content.classList.toggle('active', index === activeIndex);
    });
}
