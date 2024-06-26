const posts = [
    { icon: "🚀", name: "Excited Founder", content: "Just launched our MVP and got our first paying customer! #LaunchDay" },
    { icon: "😅", name: "Struggling Dev", content: "3 AM and still debugging. Coffee is my best friend now. #StartupLife" },
    { icon: "💸", name: "Cautious CEO", content: "Investor meeting went well, but they want to see more traction. Back to hustling! #FundingChallenge" },
    { icon: "🎉", name: "Happy Team", content: "We hit 1000 users! Time for a quick celebration before the next milestone. #GrowthMilestone" },
    { icon: "😱", name: "Panicked Marketer", content: "Our main ad account got suspended. Anyone been through this before? #MarketingNightmare" },
    { icon: "💡", name: "Inspired Designer", content: "Late-night brainstorming session led to a breakthrough feature idea! #Innovation" },
    { icon: "😤", name: "Determined Founder", content: "Major competitor just launched. We're not backing down. Game on! #CompetitionFuel" },
    { icon: "🤯", name: "Overwhelmed Solopreneur", content: "Wearing all the hats is exhausting. But who else will do it? #SoloFounderLife" },
    { icon: "🏆", name: "Proud Creator", content: "Our product just won 'Best New Startup' at TechCrunch! All the hard work is paying off. #Recognition" },
    { icon: "😔", name: "Reflective Entrepreneur", content: "First negative review hit hard. Taking a moment to reflect and improve. #GrowthMindset" },
    { icon: "🚀", name: "Optimistic Ollie", content: "Just pivoted for the 7th time this week. I think we've finally nailed it! #PivotChampion" },
  { icon: "☕️", name: "Caffeinated Cathy", content: "My blood type is now officially 'Cold Brew'. Thanks, startup life! #CoffeeIV" },
  { icon: "💸", name: "Frugal Fred", content: "Investor meeting went well. They loved my 'ramen profitable' diet plan! #LeanStartup" },
  { icon: "🎉", name: "Celebrating Charlie", content: "We hit 10 users! Time to plan our IPO. #DreamBig" },
  { icon: "😱", name: "Panicked Penny", content: "Our website went down. Turns out, hamsters aren't reliable servers. #TechWoes" },
  { icon: "💡", name: "Eureka Ethan", content: "3 AM idea: Uber, but for naps. I call it 'Snoober'. #DisruptiveSleep" },
  { icon: "🦄", name: "Unicorn Ursula", content: "VC said we're not a unicorn yet. Told them we identify as a narwhal. #SeaUnicorn" },
  { icon: "🤯", name: "Multitasking Max", content: "CEO, CTO, CFO, and janitor. My business card is now a booklet. #WearAllTheHats" },
  { icon: "🏆", name: "Humble Harry", content: "Won 'Most Likely to Succeed' at a startup event. It was my event, but still counts! #SelfMade" },
  { icon: "🔥", name: "Burnout Betty", content: "Turns out, the 'burn' in 'burn rate' isn't just about money. #StartupFlambe" },
  { icon: "🐶", name: "Pitch-Perfect Pete", content: "Elevator pitch so good, I'm now stuck riding elevators all day. #UpAndDown" },
  { icon: "🧘", name: "Zen Zoe", content: "Found inner peace during a server crash. Namaste in bed and cry. #TechMeditation" },
  { icon: "📊", name: "Data-Driven Dave", content: "60% of the time, our product works every time. #StatisticalSignificance" },
  { icon: "🎭", name: "Fake-it-til-you-make-it Fiona", content: "Our AI is so advanced, it's mostly powered by interns. #MachineLearning" },
  { icon: "🦸", name: "Superhero Sam", content: "Cape? Check. Leotard? Check. Funding? Err... #StartupSuperheroes" }
];

let currentIndex = 0;

function createNotificationElement(post) {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    
    // Function to convert hashtags to links
    const convertHashtags = (text) => {
        return text.replace(/#(\w+)/g, '<a href="#">#$1</a>');
    };

    notificationElement.innerHTML = `
        <div class="content">
            <div class="icon">
                <svg viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff"/>
                </svg>
            </div>
            <div class="text-content">
                <div class="time">now</div>
                <div class="handle">@${post.name.replace(/\s+/g, '').toLowerCase()}</div>
                <p class="text">${convertHashtags(post.content)}</p>
            </div>
        </div>
    `;
    return notificationElement;
}

function addNotification() {
    const post = posts[currentIndex];
    const notificationElement = createNotificationElement(post);
    const notificationContent = document.getElementById('notification-content');
    
    // Stack existing notifications
    const existingNotifications = notificationContent.querySelectorAll('.notification');
    existingNotifications.forEach((notification, index) => {
        notification.classList.add('stacking');
        notification.style.zIndex = -index;
    });

    notificationContent.insertBefore(notificationElement, notificationContent.firstChild);
    
    // Trigger reflow to ensure the animation plays
    notificationElement.offsetHeight;

    // Add 'active' class to trigger slide-in
    notificationElement.classList.add('active');

    setTimeout(() => {
        // Collapse stacking notifications
        const stackingNotifications = notificationContent.querySelectorAll('.notification.stacking');
        stackingNotifications.forEach(notification => {
            notification.classList.add('collapsing');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }, 3000);

    currentIndex = (currentIndex + 1) % posts.length;
}

// Initial notifications
setTimeout(() => {
    addNotification();
    setTimeout(addNotification, 4000);
}, 2000);

// Continue adding notifications
setInterval(addNotification, 10000);