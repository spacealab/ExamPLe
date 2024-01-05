document.addEventListener("DOMContentLoaded", function() {
    fetch('https://lms.navaxcollege.com/exam.php')
        .then(response => response.json())
        .then(data => createTabs(data.data.tabs))
        .catch(error => console.error('Error:', error));
});

function createTabs(tabs) {
    const tabList = document.getElementById('myTabs');
    const tabContent = document.getElementById('myTabContent');

    tabs.forEach((tab, index) => {
        const tabItem = document.createElement('li');
        const tabTitle = document.createElement('span');
        tabTitle.className = 'tab-title';
        tabTitle.textContent = tab.title;
        tabItem.appendChild(tabTitle);

        tabItem.onclick = () => setActiveTab(index);
        if (index === 0) tabItem.classList.add('active');
        tabList.appendChild(tabItem);

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
        if (index === activeIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    contents.forEach((content, index) => {
        if (index === activeIndex) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}