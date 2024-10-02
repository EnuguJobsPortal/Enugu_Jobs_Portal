let inactiveTime = 0;
let timer: NodeJS.Timeout | null = null;
let excludedRoutes: string[] = [];

const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            inactiveTime += 1000;

            if (inactiveTime >= 10 * 60 * 1000 && !shouldExcludeRoute()) {
                logout(); // Call the logout function after 10mins of inactivity
                resetTimer();
            }

        }, 1000);
    }
};

const resetTimer = () => {
    inactiveTime = 0;
};

const handleActivity = () => {
    inactiveTime = 0;
};

const logout = () => {
    // remove access token if available from local storage
    localStorage.removeItem("accessToken");
    // remove refress token from local storage
    localStorage.removeItem("refreshToken");
    //redirect to login page
    window.location.href = '/signin';
};

const initializeTimer = (options: { excludedRoutes: string[] }) => {
    if (options && options.excludedRoutes) {
        excludedRoutes = options.excludedRoutes;
    }
    startTimer();
    addEventListeners();
};

const addEventListeners = () => {
    const resetTimerEvents = ['click', 'keydown', 'mousemove'];
    const resetTimerHandler = () => {
        handleActivity();
    };

    resetTimerEvents.forEach(event => {
        window.addEventListener(event, resetTimerHandler);
    });
};

const shouldExcludeRoute = () => {
    const currentPath = window.location.pathname;
    return excludedRoutes.some(route => route === currentPath);
};

export { initializeTimer };
