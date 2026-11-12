/* ========================================================
   VocaElite Speech Studio - Multi-View, Bilingual & History
   ======================================================== */

// --- TOPBAR & GLOBAL ---
const topbarCategory = document.getElementById("topbarCategory");
const topbarTitle = document.getElementById("topbarTitle");
const systemStatusText = document.getElementById("systemStatusText");
const toggleLangEn = document.getElementById("toggleLangEn");
const toggleLangTa = document.getElementById("toggleLangTa");

// --- NAVIGATION ITEMS ---
const navDashboard = document.getElementById("navDashboard");
const navTts = document.getElementById("navTts");
const navStt = document.getElementById("navStt");
const navSign = document.getElementById("navSign");
const navVoiceLib = document.getElementById("navVoiceLib");
const navSettings = document.getElementById("navSettings");

// --- WORK HISTORY CONTROLS (LEFT SIDE) ---
const historyList = document.getElementById("historyList");
const historyCountBadge = document.getElementById("historyCountBadge");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// --- HISTORY SEARCH & FILTER ---
const historySearchInput = document.getElementById("historySearchInput");
const clearHistorySearchBtn = document.getElementById("clearHistorySearchBtn");
const filterAllBtn = document.getElementById("filterAllBtn");
const filterTtsBtn = document.getElementById("filterTtsBtn");
const filterSttBtn = document.getElementById("filterSttBtn");
const filterSignBtn = document.getElementById("filterSignBtn");
let historyFilterType = "all";
let historySearchQuery = "";

// --- VIEW CONTAINERS ---
const dashboardView = document.getElementById("dashboardView");
const ttsView = document.getElementById("ttsView");
const sttView = document.getElementById("sttView");
const signView = document.getElementById("signView");

// --- DASHBOARD STEP 1 ELEMENTS ---
const step1TagText = document.getElementById("step1TagText");
const step1Heading = document.getElementById("step1Heading");
const step1Desc = document.getElementById("step1Desc");
const feat1Title = document.getElementById("feat1Title");
const feat1Desc = document.getElementById("feat1Desc");
const feat2Title = document.getElementById("feat2Title");
const feat2Desc = document.getElementById("feat2Desc");
const feat3Title = document.getElementById("feat3Title");
const feat3Desc = document.getElementById("feat3Desc");
const feat4Title = document.getElementById("feat4Title");
const feat4Desc = document.getElementById("feat4Desc");
const feat5Title = document.getElementById("feat5Title");
const feat5Desc = document.getElementById("feat5Desc");

// --- DASHBOARD STEP 2 ELEMENTS ---
const step2TagText = document.getElementById("step2TagText");
const step2Heading = document.getElementById("step2Heading");
const step2Desc = document.getElementById("step2Desc");
const langChoiceEn = document.getElementById("langChoiceEn");
const langChoiceTa = document.getElementById("langChoiceTa");
const langChoiceEnTitle = document.getElementById("langChoiceEnTitle");
const langChoiceEnDesc = document.getElementById("langChoiceEnDesc");
const langChoiceTaTitle = document.getElementById("langChoiceTaTitle");
const langChoiceTaDesc = document.getElementById("langChoiceTaDesc");

// --- DASHBOARD STEP 3 ELEMENTS ---
const step3TagText = document.getElementById("step3TagText");
const step3Heading = document.getElementById("step3Heading");
const step3Desc = document.getElementById("step3Desc");
const cardSelectTts = document.getElementById("cardSelectTts");
const ttsBadgeLabel = document.getElementById("ttsBadgeLabel");
const ttsCardTitle = document.getElementById("ttsCardTitle");
const ttsCardDesc = document.getElementById("ttsCardDesc");
const btnLaunchTts = document.getElementById("btnLaunchTts");
const btnLaunchTtsText = document.getElementById("btnLaunchTtsText");

const cardSelectStt = document.getElementById("cardSelectStt");
const sttBadgeLabel = document.getElementById("sttBadgeLabel");
const sttCardTitle = document.getElementById("sttCardTitle");
const sttCardDesc = document.getElementById("sttCardDesc");
const btnLaunchStt = document.getElementById("btnLaunchStt");
const btnLaunchSttText = document.getElementById("btnLaunchSttText");

const cardSelectSign = document.getElementById("cardSelectSign");
const signBadgeLabel = document.getElementById("signBadgeLabel");
const signCardTitle = document.getElementById("signCardTitle");
const signCardDesc = document.getElementById("signCardDesc");
const btnLaunchSign = document.getElementById("btnLaunchSign");
const btnLaunchSignText = document.getElementById("btnLaunchSignText");

const btnBackFromTts = document.getElementById("btnBackFromTts");
const btnBackFromStt = document.getElementById("btnBackFromStt");
const btnBackFromSign = document.getElementById("btnBackFromSign");

// --- WIZARD PANEL ELEMENTS ---
const dashStep1 = document.getElementById("dashStep1");
const dashStep2 = document.getElementById("dashStep2");
const dashStep3 = document.getElementById("dashStep3");
const wizIndStep1 = document.getElementById("wizIndStep1");
const wizIndStep2 = document.getElementById("wizIndStep2");
const wizIndStep3 = document.getElementById("wizIndStep3");
const wizConn1 = document.getElementById("wizConn1");
const wizConn2 = document.getElementById("wizConn2");
const btnStep1Next = document.getElementById("btnStep1Next");
const btnStep2Back = document.getElementById("btnStep2Back");
const btnStep2Next = document.getElementById("btnStep2Next");
const btnStep3Back = document.getElementById("btnStep3Back");
let currentDashStep = 1;

// --- TEXT TO SPEECH (TTS) CONTROLS ---
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const clearBtn = document.getElementById("clearBtn");
const pasteBtn = document.getElementById("pasteBtn");
const sampleBtn = document.getElementById("sampleBtn");
const languageSelect = document.getElementById("languageSelect");
const voiceSelect = document.getElementById("voiceSelect");
const speed = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const pitch = document.getElementById("pitch");
const pitchValue = document.getElementById("pitchValue");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");
const statusText = document.getElementById("statusText");
const stopBtn = document.getElementById("stopBtn");
const speakBtn = document.getElementById("speakBtn");
const playerCard = document.getElementById("playerCard");
const playerTitle = document.getElementById("playerTitle");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const playerTime = document.getElementById("playerTime");

// --- SPEECH TO TEXT (STT) CONTROLS ---
const sttLanguageSelect = document.getElementById("sttLanguageSelect");
const sttToggleBtn = document.getElementById("sttToggleBtn");
const sttToggleText = document.getElementById("sttToggleText");
const sttSoundWave = document.getElementById("sttSoundWave");
const sttMicCircle = document.getElementById("sttMicCircle");
const sttStatusDot = document.getElementById("sttStatusDot");
const sttStatusText = document.getElementById("sttStatusText");
const sttCharCount = document.getElementById("sttCharCount");
const sttWordCount = document.getElementById("sttWordCount");
const copyTranscriptBtn = document.getElementById("copyTranscriptBtn");
const downloadTranscriptBtn = document.getElementById("downloadTranscriptBtn");
const sendToTtsBtn = document.getElementById("sendToTtsBtn");
const clearTranscriptBtn = document.getElementById("clearTranscriptBtn");
const sttTranscriptInput = document.getElementById("sttTranscriptInput");

// --- SIGN LANGUAGE TO VOICE & TEXT CONTROLS ---
const signViewTitle = document.getElementById("signViewTitle");
const cameraHeaderTitle = document.getElementById("cameraHeaderTitle");
const cameraStatusPill = document.getElementById("cameraStatusPill");
const cameraDot = document.getElementById("cameraDot");
const cameraStatusText = document.getElementById("cameraStatusText");
const signVideo = document.getElementById("signVideo");
const signCanvas = document.getElementById("signCanvas");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");
const camPlaceholderHeading = document.getElementById("camPlaceholderHeading");
const camPlaceholderText = document.getElementById("camPlaceholderText");
const btnStartCameraPrompt = document.getElementById("btnStartCameraPrompt");
const camPromptBtnText = document.getElementById("camPromptBtnText");
const signHudOverlay = document.getElementById("signHudOverlay");
const hudIcon = document.getElementById("hudIcon");
const hudLabelText = document.getElementById("hudLabelText");
const hudSignName = document.getElementById("hudSignName");
const hudSignSub = document.getElementById("hudSignSub");
const hudConfidenceFill = document.getElementById("hudConfidenceFill");
const hudConfidenceText = document.getElementById("hudConfidenceText");
const btnToggleCamera = document.getElementById("btnToggleCamera");
const btnToggleCameraIcon = document.getElementById("btnToggleCameraIcon");
const btnToggleCameraText = document.getElementById("btnToggleCameraText");
const btnFlipCamera = document.getElementById("btnFlipCamera");
const toggleAutoSpeak = document.getElementById("toggleAutoSpeak");
const autoSpeakLabel = document.getElementById("autoSpeakLabel");

const currentSignCardTitle = document.getElementById("currentSignCardTitle");
const signSourceBadge = document.getElementById("signSourceBadge");
const currentSignSymbol = document.getElementById("currentSignSymbol");
const signCategoryLabel = document.getElementById("signCategoryLabel");
const currentSignEn = document.getElementById("currentSignEn");
const currentSignTa = document.getElementById("currentSignTa");
const currentSignHint = document.getElementById("currentSignHint");
const btnAppendCurrentSign = document.getElementById("btnAppendCurrentSign");
const btnSpeakCurrentSign = document.getElementById("btnSpeakCurrentSign");

const sentenceBuilderTitle = document.getElementById("sentenceBuilderTitle");
const btnSignCopy = document.getElementById("btnSignCopy");
const btnSignDownload = document.getElementById("btnSignDownload");
const btnSignSendTts = document.getElementById("btnSignSendTts");
const btnSignClear = document.getElementById("btnSignClear");
const signTextInput = document.getElementById("signTextInput");
const btnSignSpace = document.getElementById("btnSignSpace");
const btnSignBackspace = document.getElementById("btnSignBackspace");
const btnSignPeriod = document.getElementById("btnSignPeriod");
const btnSpeakSentence = document.getElementById("btnSpeakSentence");

const quickPadHeading = document.getElementById("quickPadHeading");
const tabCommonSigns = document.getElementById("tabCommonSigns");
const tabAlphabetSigns = document.getElementById("tabAlphabetSigns");
const btnOpenSignGuide = document.getElementById("btnOpenSignGuide");
const phrasesGrid = document.getElementById("phrasesGrid");
const alphabetGrid = document.getElementById("alphabetGrid");

const signGuideModal = document.getElementById("signGuideModal");
const btnCloseSignGuide = document.getElementById("btnCloseSignGuide");
const signGuideContent = document.getElementById("signGuideContent");

// --- STATE MANAGEMENT ---
let currentView = "dashboard";
let appLang = localStorage.getItem("vocaelite_app_lang") || "en";
let voices = [];
let currentSpeech = null;
let isSpeaking = false;
let isPaused = false;
let progressInterval = null;
let keepAliveInterval = null;

// Speech Recognition instance
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isDictating = false;
let shouldKeepDictating = false;
let dictationBaseText = "";

// Work History State
let workHistory = [];
const HISTORY_STORAGE_KEY = "vocaelite_work_history";

/* ========================================================
   FEATURE DETECTION
   ======================================================== */
const hasTTS = "speechSynthesis" in window;
const hasSTT = !!SpeechRecognition;

if (!hasTTS && !hasSTT) {
    if (systemStatusText) systemStatusText.textContent = "Speech API unsupported";
} else if (!hasSTT) {
    if (systemStatusText) systemStatusText.textContent = "TTS online (STT unsupported)";
} else {
    if (systemStatusText) systemStatusText.textContent = "TTS & STT online";
}

/* ========================================================
   BILINGUAL LOCALIZATION (ENGLISH & TAMIL)
   ======================================================== */
const translations = {
    en: {
        topbarWelcome: "SPEECH STUDIO HUB",
        topbarTitle: "Dashboard",
        systemReady: "TTS & STT online",
        navDashboard: "Dashboard",
        navTts: "Text to Speech",
        navStt: "Speech to Text",
        navSign: "Sign to Voice & Text",
        navVoiceLib: "Voice Library",
        navSettings: "Settings",
        historyTitle: "Work History",
        clearHistory: "Clear",
        noHistoryTitle: "No history yet",
        noHistorySub: "Works you convert or dictate will be saved here automatically.",

        // Step 1
        step1Tag: "EXPLORE CAPABILITIES",
        step1Heading: "What is in VocaElite Speech Studio?",
        step1Desc: "Explore the audio and speech capabilities packed into this intelligent studio:",
        feat1Title: "Text to Speech (TTS)",
        feat1Desc: "Convert typed or pasted text into lifelike natural voice with customizable speech speed, pitch, and volume.",
        feat2Title: "Speech to Text Dictation (STT)",
        feat2Desc: "Speak directly into your microphone for real-time live transcription with instant copy and .txt file download.",
        feat3Title: "Bilingual Engine (English & Tamil)",
        feat3Desc: "Full native support to use the app in English or தமிழ் with speech recognition and synthesis for both languages.",
        feat4Title: "Persistent Work History",
        feat4Desc: "All your generated speeches and dictated transcripts are automatically saved in the left sidebar with 1-click restore.",
        feat5Title: "Sign Language to Voice & Text",
        feat5Desc: "Real-time webcam hand gesture recognition converted to live sentences and spoken voice.",

        // Step 2
        step2Tag: "CHOOSE YOUR PREFERRED LANGUAGE",
        step2Heading: "Which language do you want to use?",
        step2Desc: "Select your preferred language for the application interface and default speech engine:",
        langChoiceEnTitle: "English",
        langChoiceEnDesc: "Use app in English (Default speech: English US)",
        langChoiceTaTitle: "தமிழ் (Tamil)",
        langChoiceTaDesc: "செயலியை தமிழில் பயன்படுத்தவும் (இயல்பு மொழி: தமிழ்)",

        // Step 3
        step3Tag: "START YOUR WORK",
        step3Heading: "Start working in your chosen studio",
        step3Desc: "Choose whether you want to convert text into speech, or dictate speech into text:",
        ttsBadge: "VOICE SYNTHESIS",
        ttsCardTitle: "Text to Speech",
        ttsCardDesc: "Turn your written words, scripts, or articles into natural, expressive speech with customizable voice, speed, pitch, and volume.",
        btnLaunchTtsText: "Open Text to Speech →",
        sttBadge: "LIVE DICTATION",
        sttCardTitle: "Speech to Text",
        sttCardDesc: "Speak into your microphone and transcribe your voice into editable, clean text in real-time with full multi-language recognition.",
        btnLaunchSttText: "Open Speech to Text →",
        signBadge: "CAMERA AI GESTURE",
        signCardTitle: "Sign to Voice & Text",
        signCardDesc: "Translate sign language gestures using webcam AI or interactive sign pad into live text sentences and natural vocal speech.",
        btnLaunchSignText: "Open Sign Studio →",

        // TTS Studio
        backBtn: "← Back to Dashboard",
        ttsInputPlaceholder: "Type or paste your text here to convert into natural speech...\n\nExample: Welcome to VocaElite, your intelligent text-to-speech studio.",
        clearBtn: "Clear",
        pasteBtn: "Paste",
        sampleBtn: "Sample Text",
        statusReadyTts: "Enter text and select your preferred voice.",
        convertBtn: "Convert to Speech",
        stopBtn: "■ Stop",
        nowPlaying: "NOW PLAYING",
        generatedSpeech: "Generated Speech",

        // STT Studio
        sttHeroHeading: "Speak into your microphone",
        sttHeroDesc: "Select your preferred recognition language below, then click the microphone or 'Start Dictation' button to begin live transcription.",
        startDictation: "Start Dictation",
        stopDictation: "Stop Dictation",
        sttReadyText: "Microphone ready. Select language and click Start Dictation.",
        sttListeningText: "🎙 Listening... Speak into your microphone.",
        sttTranscriptTitle: "Transcribed Words",
        sttPlaceholder: "Your spoken words will appear here in real time as you speak...\n\n1. Choose your language above.\n2. Click 'Start Dictation' or the microphone icon.\n3. Speak clearly into your microphone.",
        copyTranscript: "📋 Copy Text",
        downloadTranscript: "💾 Download (.txt)",
        sendToTts: "🔊 Send to TTS",
        clearTranscript: "Clear",
        copied: "✓ Copied!",
        nothingToCopy: "⚠ Nothing to copy!",
        ttsSuccess: "Speech conversion completed successfully.",

        // Sign Studio
        signStudioTitle: "Sign Language to Voice & Text",
        cameraInactive: "Camera Inactive",
        cameraActive: "Camera Active (Tracking Hands)",
        startCamera: "Start Camera",
        stopCamera: "Stop Camera",
        camPlaceholderHeading: "Camera is turned off",
        camPlaceholderText: "Click 'Start Camera' to detect hand gestures in real time, or click any sign in the Quick Sign Pad below.",
        currentSignCardTitle: "Current Gesture",
        sentenceBuilderTitle: "Translated Text",
        quickPadHeading: "Quick Sign Pad & ASL Visual Dictionary",
        tabCommonSigns: "Common Phrases",
        tabAlphabetSigns: "ASL Alphabet (A-Z)",
        btnOpenSignGuide: "📖 Sign Guide",
        btnAppendSign: "＋ Add to Sentence",
        btnSpeakSign: "🔊 Speak Sign",
        btnSpeakSentence: "▶ Speak Sentence",
        autoSpeakLabel: "🔊 Auto-Speak Sign"
    },
    ta: {
        topbarWelcome: "ஸ்பீச் ஸ்டுடியோ மையம்",
        topbarTitle: "டாஷ்போர்டு (முகப்பு)",
        systemReady: "TTS & STT இயங்குகிறது",
        navDashboard: "முகப்பு",
        navTts: "உரையிலிருந்து பேச்சு",
        navStt: "பேச்சிலிருந்து உரை",
        navSign: "சைகை மொழி ஸ்டுடியோ",
        navVoiceLib: "குரல் நூலகம்",
        navSettings: "அமைப்புகள்",
        historyTitle: "பணி வரலாறு",
        clearHistory: "அழி",
        noHistoryTitle: "வரலாறு இல்லை",
        noHistorySub: "நீங்கள் மாற்றிய உரைகளும் பேச்சுகளும் இங்கே தானாகவே சேமிக்கப்படும்.",

        // Step 1
        step1Tag: "படி 1 • செயலியில் உள்ள வசதிகள்",
        step1Heading: "VocaElite செயலியில் என்னென்ன உள்ளன?",
        step1Desc: "உயர்தரக் குரல் பேச்சை உருவாக்கவும், நேரடிப் பேச்சை உரையாக மாற்றவும் தேவையான அம்சங்கள்:",
        feat1Title: "உரையிலிருந்து பேச்சு (TTS)",
        feat1Desc: "எந்தவொரு உரையையும் விருப்பமான வேகம், சுருதி மற்றும் குரலில் இயற்கையான பேச்சாக மாற்றலாம்.",
        feat2Title: "பேச்சிலிருந்து உரை (STT)",
        feat2Desc: "மைக்ரோஃபோனில் பேசி நிகழ்நேரத்தில் உரையாக மாற்றி ஒரே கிளிக்கில் நகலெடுத்து பதிவிறக்கலாம்.",
        feat3Title: "இருமொழி ஆதரவு (English & தமிழ்)",
        feat3Desc: "ஆங்கிலம் மற்றும் தமிழ் ஆகிய இரு மொழிகளிலும் முழுமையான குரல் மற்றும் பேச்சு ஏற்பு.",
        feat4Title: "நிரந்தரப் பணி வரலாறு",
        feat4Desc: "உங்கள் முந்தைய அனைத்துப் பணிகளும் இடதுபுறப் பக்கத்தில் தானாகவே சேமிக்கப்படும்.",
        feat5Title: "சைகை மொழியிலிருந்து குரல் & உரை",
        feat5Desc: "கேமரா மூலம் கை சைகைகளை நிகழ்நேரத்தில் கண்டறிந்து நேரடி வாக்கியங்களாகவும் பேச்சாகவும் மாற்றலாம்.",

        // Step 2
        step2Tag: "படி 2 • உங்கள் விருப்ப மொழியைத் தேர்வுசெய்க",
        step2Heading: "செயலியை எந்த மொழியில் பயன்படுத்த விரும்புகிறீர்கள்?",
        step2Desc: "பயன்பாட்டு இடைமுகம் மற்றும் இயல்பு குரல் என்ஜினுக்கான முதன்மை மொழியைத் தேர்வுசெய்யவும்:",
        langChoiceEnTitle: "English (ஆங்கிலம்)",
        langChoiceEnDesc: "Use app in English (இயல்பு மொழி: English US)",
        langChoiceTaTitle: "தமிழ் (Tamil)",
        langChoiceTaDesc: "செயலியை தமிழில் பயன்படுத்தவும் (இயல்பு மொழி: தமிழ்)",

        // Step 3
        step3Tag: "படி 3 • உங்கள் பணியைத் தொடங்குங்கள்",
        step3Heading: "பணியைத் தொடங்க ஒரு ஸ்டுடியோவைத் தேர்வுசெய்யவும்",
        step3Desc: "உரையைப் பேச்சாக மாற்ற வேண்டுமா அல்லது பேச்சை உரையாக மாற்ற வேண்டுமா எனத் தேர்ந்தெடுக்கவும்:",
        ttsBadge: "குரல் உருவாக்கம்",
        ttsCardTitle: "உரையிலிருந்து பேச்சு (TTS)",
        ttsCardDesc: "உங்கள் உரைகளை இயற்கை குரலாக மாற்றி, வேகம், சுருதி மற்றும் ஒலியளவை சரிசெய்யுங்கள்.",
        btnLaunchTtsText: "உரையிலிருந்து பேச்சு தொடங்குக →",
        sttBadge: "நேரடிப் பேச்சு ஏற்பு",
        sttCardTitle: "பேச்சிலிருந்து உரை (STT)",
        sttCardDesc: "மைக்ரோஃபோனில் பேசி உங்கள் குரலை நிகழ்நேரத்தில் எடிட் செய்யக்கூடிய உரையாக மாற்றுங்கள்.",
        btnLaunchSttText: "பேச்சிலிருந்து உரை தொடங்குக →",
        signBadge: "கேமரா AI சைகை",
        signCardTitle: "சைகையிலிருந்து குரல் & உரை",
        signCardDesc: "கை சைகைகளை கேமரா மூலம் கண்டறிந்து நேரடி வாக்கியங்களாகவும் பேச்சாகவும் மாற்றவும்.",
        btnLaunchSignText: "சைகை ஸ்டுடியோ தொடங்குக →",

        // TTS Studio
        backBtn: "← முகப்புக்குத் திரும்பு",
        ttsInputPlaceholder: "இயற்கையான பேச்சாக மாற்ற உங்கள் உரையை இங்கே தட்டச்சு செய்யவும் அல்லது ஒட்டவும்...\n\nஎடுத்துக்காட்டு: VocaElite ஸ்பீச் ஸ்டுடியோவுக்கு நல்வரவு.",
        clearBtn: "அழி",
        pasteBtn: "ஒட்டு",
        sampleBtn: "மாதிரி உரை",
        statusReadyTts: "உரையை உள்ளிட்டு உங்கள் விருப்பமான குரலைத் தேர்ந்தெடுக்கவும்.",
        convertBtn: "பேச்சாக மாற்று",
        stopBtn: "■ நிறுத்து",
        nowPlaying: "தற்போது ஒலிப்பது",
        generatedSpeech: "உருவாக்கப்பட்ட பேச்சு",

        // STT Studio
        sttHeroHeading: "உங்கள் மைக்ரோஃபோனில் பேசவும்",
        sttHeroDesc: "கீழே உங்கள் மொழியைத் தேர்ந்தெடுத்து, மைக்ரோஃபோனை அழுத்தி பேச்சை நேரடியாக உரையாக மாற்றவும்.",
        startDictation: "பேசத் தொடங்கு",
        stopDictation: "பேச்சை நிறுத்து",
        sttReadyText: "மைக்ரோஃபோன் தயார். மொழியைத் தேர்ந்தெடுத்து 'பேசத் தொடங்கு' என்பதைக் கிளிக் செய்யவும்.",
        sttListeningText: "🎙 கேட்கிறது... மைக்ரோஃபோனில் தெளிவாகப் பேசவும்.",
        sttTranscriptTitle: "மாற்றப்பட்ட உரை",
        sttPlaceholder: "நீங்கள் பேசும் வார்த்தைகள் நிகழ்நேரத்தில் இங்கே தானாகவே தட்டச்சாகும்...\n\n1. மொழியைத் தேர்ந்தெடுக்கவும்.\n2. 'பேசத் தொடங்கு' என்பதைக் கிளிக் செய்யவும்.\n3. மைக்ரோஃபோனில் பேசவும்.",
        copyTranscript: "📋 உரையை நகலெடு",
        downloadTranscript: "💾 பதிவிறக்கு (.txt)",
        sendToTts: "🔊 TTS-க்கு அனுப்பு",
        clearTranscript: "அழி",
        copied: "✓ நகலெடுக்கப்பட்டது!",
        nothingToCopy: "⚠ நகலெடுக்க உரை இல்லை!",
        ttsSuccess: "பேச்சு வெற்றிகரமாக மாற்றப்பட்டது.",

        // Sign Studio
        signStudioTitle: "சைகை மொழியிலிருந்து குரல் மற்றும் உரை",
        cameraInactive: "கேமரா அணைக்கப்பட்டுள்ளது",
        cameraActive: "கேமரா இயங்குகிறது (கை சைகை கண்டறிதல்)",
        startCamera: "கேமராவைத் தொடங்கு",
        stopCamera: "கேமராவை நிறுத்து",
        camPlaceholderHeading: "கேமரா அணைக்கப்பட்டுள்ளது",
        camPlaceholderText: "நிகழ்நேர கை சைகைகளைக் கண்டறிய 'கேமராவைத் தொடங்கு' என்பதை அழுத்தவும், அல்லது கீழே உள்ள சைகைப் பலகையைப் பயன்படுத்தவும்.",
        currentSignCardTitle: "தற்போதைய சைகை",
        sentenceBuilderTitle: "வாக்கிய உருவாக்கம்",
        quickPadHeading: "விரைவு சைகைப் பலகை & அகராதி",
        tabCommonSigns: "பொதுவான சொற்கள்",
        tabAlphabetSigns: "ஆங்கில எழுத்துக்கள் (A-Z)",
        btnOpenSignGuide: "📖 சைகை வழிகாட்டி",
        btnAppendSign: "＋ வாக்கியத்தில் சேர்",
        btnSpeakSign: "🔊 சைகையை வாசி",
        btnSpeakSentence: "▶ முழு வாக்கியத்தையும் வாசி",
        autoSpeakLabel: "🔊 தானாக வாசி"
    }
};

function setAppLanguage(lang) {
    appLang = lang === "ta" ? "ta" : "en";
    localStorage.setItem("vocaelite_app_lang", appLang);
    const t = translations[appLang];

    // Update topbar pills
    if (toggleLangEn) toggleLangEn.classList.toggle("active", appLang === "en");
    if (toggleLangTa) toggleLangTa.classList.toggle("active", appLang === "ta");

    // Update Step 2 cards active state
    if (langChoiceEn) langChoiceEn.classList.toggle("active", appLang === "en");
    if (langChoiceTa) langChoiceTa.classList.toggle("active", appLang === "ta");

    // Update Topbar
    if (topbarCategory) {
        if (currentView === "dashboard") topbarCategory.textContent = t.topbarWelcome;
        else topbarCategory.textContent = appLang === "ta" ? "ஸ்டுடியோ பயன்முறை" : "STUDIO MODE";
    }
    if (topbarTitle) {
        if (currentView === "dashboard") topbarTitle.textContent = t.topbarTitle;
        else if (currentView === "tts") topbarTitle.textContent = t.ttsStudioTitle;
        else if (currentView === "stt") topbarTitle.textContent = t.sttStudioTitle;
        else if (currentView === "sign") topbarTitle.textContent = t.signStudioTitle;
    }
    if (systemStatusText) systemStatusText.textContent = t.systemReady;

    // Update Navigation
    if (navDashboard) navDashboard.innerHTML = `<span>⌂</span> ${t.navDashboard}`;
    if (navTts) navTts.innerHTML = `<span>◉</span> ${t.navTts}`;
    if (navStt) navStt.innerHTML = `<span>🎙</span> ${t.navStt}`;
    if (navSign) navSign.innerHTML = `<span>🤟</span> ${t.navSign}`;
    if (navVoiceLib) navVoiceLib.innerHTML = `<span>◈</span> ${t.navVoiceLib}`;
    if (navSettings) navSettings.innerHTML = `<span>⚙</span> ${t.navSettings}`;

    // Update Sidebar History Header
    const historyTitleEl = document.querySelector(".history-title");
    if (historyTitleEl) historyTitleEl.textContent = t.historyTitle;
    if (clearHistoryBtn) clearHistoryBtn.textContent = t.clearHistory;

    // Update Step 1
    if (step1TagText) step1TagText.textContent = t.step1Tag;
    if (step1Heading) step1Heading.textContent = t.step1Heading;
    if (step1Desc) step1Desc.textContent = t.step1Desc;
    if (feat1Title) feat1Title.textContent = t.feat1Title;
    if (feat1Desc) feat1Desc.textContent = t.feat1Desc;
    if (feat2Title) feat2Title.textContent = t.feat2Title;
    if (feat2Desc) feat2Desc.textContent = t.feat2Desc;
    if (feat3Title) feat3Title.textContent = t.feat3Title;
    if (feat3Desc) feat3Desc.textContent = t.feat3Desc;
    if (feat4Title) feat4Title.textContent = t.feat4Title;
    if (feat4Desc) feat4Desc.textContent = t.feat4Desc;
    if (feat5Title) feat5Title.textContent = t.feat5Title;
    if (feat5Desc) feat5Desc.textContent = t.feat5Desc;

    // Update Step 2
    if (step2TagText) step2TagText.textContent = t.step2Tag;
    if (step2Heading) step2Heading.textContent = t.step2Heading;
    if (step2Desc) step2Desc.textContent = t.step2Desc;
    if (langChoiceEnTitle) langChoiceEnTitle.textContent = t.langChoiceEnTitle;
    if (langChoiceEnDesc) langChoiceEnDesc.textContent = t.langChoiceEnDesc;
    if (langChoiceTaTitle) langChoiceTaTitle.textContent = t.langChoiceTaTitle;
    if (langChoiceTaDesc) langChoiceTaDesc.textContent = t.langChoiceTaDesc;

    // Update Step 3
    if (step3TagText) step3TagText.textContent = t.step3Tag;
    if (step3Heading) step3Heading.textContent = t.step3Heading;
    if (step3Desc) step3Desc.textContent = t.step3Desc;
    if (ttsBadgeLabel) ttsBadgeLabel.textContent = t.ttsBadge;
    if (ttsCardTitle) ttsCardTitle.textContent = t.ttsCardTitle;
    if (ttsCardDesc) ttsCardDesc.textContent = t.ttsCardDesc;
    if (btnLaunchTtsText) btnLaunchTtsText.textContent = t.btnLaunchTtsText;
    if (sttBadgeLabel) sttBadgeLabel.textContent = t.sttBadge;
    if (sttCardTitle) sttCardTitle.textContent = t.sttCardTitle;
    if (sttCardDesc) sttCardDesc.textContent = t.sttCardDesc;
    if (btnLaunchSttText) btnLaunchSttText.textContent = t.btnLaunchSttText;
    if (signBadgeLabel) signBadgeLabel.textContent = t.signBadge;
    if (signCardTitle) signCardTitle.textContent = t.signCardTitle;
    if (signCardDesc) signCardDesc.textContent = t.signCardDesc;
    if (btnLaunchSignText) btnLaunchSignText.textContent = t.btnLaunchSignText;

    // Update Back Buttons
    if (btnBackFromTts) btnBackFromTts.innerHTML = `<span>←</span> ${t.backBtn.replace("← ", "")}`;
    if (btnBackFromStt) btnBackFromStt.innerHTML = `<span>←</span> ${t.backBtn.replace("← ", "")}`;
    if (btnBackFromSign) btnBackFromSign.innerHTML = `<span>←</span> ${t.backBtn.replace("← ", "")}`;

    // Update Sign Studio Controls
    if (signViewTitle) signViewTitle.textContent = t.signStudioTitle;
    if (cameraHeaderTitle) cameraHeaderTitle.textContent = appLang === "ta" ? "நேரடி கை சைகை கண்டறிதல்" : "Live Camera Gesture Tracker";
    if (cameraStatusText && !isCameraRunning) cameraStatusText.textContent = t.cameraInactive;
    if (btnToggleCameraText && !isCameraRunning) btnToggleCameraText.textContent = t.startCamera;
    if (camPlaceholderHeading) camPlaceholderHeading.textContent = t.camPlaceholderHeading;
    if (camPlaceholderText) camPlaceholderText.textContent = t.camPlaceholderText;
    if (camPromptBtnText) camPromptBtnText.textContent = t.startCamera;
    if (currentSignCardTitle) currentSignCardTitle.textContent = t.currentSignCardTitle;
    if (sentenceBuilderTitle) sentenceBuilderTitle.textContent = t.sentenceBuilderTitle;
    if (quickPadHeading) quickPadHeading.textContent = t.quickPadHeading;
    if (tabCommonSigns) tabCommonSigns.textContent = t.tabCommonSigns;
    if (tabAlphabetSigns) tabAlphabetSigns.textContent = t.tabAlphabetSigns;
    if (btnOpenSignGuide) btnOpenSignGuide.textContent = t.btnOpenSignGuide;
    if (btnAppendCurrentSign) btnAppendCurrentSign.textContent = t.btnAppendSign;
    if (btnSpeakCurrentSign) btnSpeakCurrentSign.textContent = t.btnSpeakSign;
    if (btnSpeakSentence) btnSpeakSentence.innerHTML = `<span>▶</span> ${t.btnSpeakSentence.replace("▶ ", "")}`;
    if (autoSpeakLabel) autoSpeakLabel.textContent = t.autoSpeakLabel;
    if (typeof renderQuickSignPads === "function") renderQuickSignPads();

    // Update TTS controls
    if (textInput) textInput.placeholder = t.ttsInputPlaceholder;
    if (clearBtn) clearBtn.textContent = t.clearBtn;
    if (pasteBtn) pasteBtn.textContent = t.pasteBtn;
    if (sampleBtn) sampleBtn.textContent = t.sampleBtn;
    if (speakBtn) speakBtn.innerHTML = `<span>▶</span> ${t.convertBtn}`;
    if (stopBtn) stopBtn.textContent = t.stopBtn;
    if (statusText && !isSpeaking) statusText.textContent = t.statusReadyTts;

    // Update STT controls
    if (!isDictating && sttToggleText) sttToggleText.textContent = t.startDictation;
    if (!isDictating && sttStatusText) sttStatusText.textContent = t.sttReadyText;
    if (sttTranscriptInput) sttTranscriptInput.placeholder = t.sttPlaceholder;
    if (copyTranscriptBtn) copyTranscriptBtn.textContent = t.copyTranscript;
    if (downloadTranscriptBtn) downloadTranscriptBtn.textContent = t.downloadTranscript;
    if (sendToTtsBtn) sendToTtsBtn.textContent = t.sendToTts;
    if (clearTranscriptBtn) clearTranscriptBtn.textContent = t.clearTranscript;

    // Configure Default Engine Language:
    if (appLang === "ta") {
        if (languageSelect) languageSelect.value = "ta-IN";
        if (sttLanguageSelect) sttLanguageSelect.value = "ta-IN";
    } else {
        if (languageSelect) languageSelect.value = "en-US";
        if (sttLanguageSelect) sttLanguageSelect.value = "en-US";
    }
    loadVoices();
    renderHistory();
}

// Wire Language Selection Listeners
if (toggleLangEn) toggleLangEn.addEventListener("click", () => setAppLanguage("en"));
if (toggleLangTa) toggleLangTa.addEventListener("click", () => setAppLanguage("ta"));
if (langChoiceEn) langChoiceEn.addEventListener("click", () => {
    setAppLanguage("en");
    // auto-advance to step 3 after picking language
    setTimeout(() => showDashStep(3), 280);
});
if (langChoiceTa) langChoiceTa.addEventListener("click", () => {
    setAppLanguage("ta");
    setTimeout(() => showDashStep(3), 280);
});

/* ========================================================
   DASHBOARD WIZARD STEP NAVIGATION
   ======================================================== */
function showDashStep(stepNum) {
    currentDashStep = stepNum;
    const panels = [dashStep1, dashStep2, dashStep3];
    const indicators = [wizIndStep1, wizIndStep2, wizIndStep3];
    const connectors = [wizConn1, wizConn2];

    // Show correct panel, hide others
    panels.forEach((panel, i) => {
        if (!panel) return;
        if (i + 1 === stepNum) {
            panel.classList.remove("hidden-wiz-panel");
        } else {
            panel.classList.add("hidden-wiz-panel");
        }
    });

    // Update step indicator bubbles
    indicators.forEach((ind, i) => {
        if (!ind) return;
        ind.classList.remove("active", "done");
        if (i + 1 === stepNum) {
            ind.classList.add("active");
        } else if (i + 1 < stepNum) {
            ind.classList.add("done");
        }
    });

    // Update connectors (fill connectors before current step)
    if (connectors[0]) connectors[0].classList.toggle("filled", stepNum > 1);
    if (connectors[1]) connectors[1].classList.toggle("filled", stepNum > 2);

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Wire wizard nav buttons
if (btnStep1Next) btnStep1Next.addEventListener("click", () => showDashStep(2));
if (btnStep2Back) btnStep2Back.addEventListener("click", () => showDashStep(1));
if (btnStep2Next) btnStep2Next.addEventListener("click", () => showDashStep(3));
if (btnStep3Back) btnStep3Back.addEventListener("click", () => showDashStep(2));

/* ========================================================
   WORK HISTORY (LEFT-SIDE PANEL WITH LOCALSTORAGE)
   ======================================================== */
function loadHistory() {
    try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        workHistory = stored ? JSON.parse(stored) : [];
    } catch (e) {
        workHistory = [];
    }
    renderHistory();
}

function saveHistory() {
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(workHistory));
    } catch (e) {
        console.warn("Failed to persist history to localStorage:", e);
    }
}

function escapeHtml(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = "";
    const t = translations[appLang] || translations.en;

    // Apply search & type filter
    let filtered = workHistory.filter(item => {
        const typeMatch = (historyFilterType === "all") || (item.type === historyFilterType);
        const textMatch = !historySearchQuery ||
            item.text.toLowerCase().includes(historySearchQuery) ||
            (item.lang || "").toLowerCase().includes(historySearchQuery);
        return typeMatch && textMatch;
    });

    if (historyCountBadge) historyCountBadge.textContent = workHistory.length;

    if (workHistory.length === 0) {
        historyList.innerHTML = `
            <div class="history-empty">
                <span class="empty-icon">📁</span>
                <p>${t.noHistoryTitle}</p>
                <span>${t.noHistorySub}</span>
            </div>
        `;
        return;
    }

    if (filtered.length === 0) {
        historyList.innerHTML = `
            <div class="history-empty">
                <span class="empty-icon">🔍</span>
                <p>${appLang === "ta" ? "பொருந்தவில்லை" : "No matches"}</p>
                <span>${appLang === "ta" ? "வேறு வார்த்தையை தேடவும்." : "Try a different search."}</span>
            </div>
        `;
        return;
    }

    filtered.forEach((item) => {
        const card = document.createElement("div");
        card.className = "history-item";
        card.setAttribute("data-id", item.id);
        card.setAttribute("title", `Click to load this work`);

        const isTts = item.type === "tts";
        const isStt = item.type === "stt";
        const badgeClass = isTts ? "tts" : (isStt ? "stt" : "sign");
        const icon = isTts ? "🔊" : (isStt ? "🎙" : "🤟");
        const label = isTts ? "TTS" : (isStt ? "STT" : "SIGN");

        card.innerHTML = `
            <div class="history-item-top">
                <span class="history-type-badge ${badgeClass}">
                    <span>${icon}</span> ${label}
                </span>
                <div style="display:flex; align-items:center; gap:6px;">
                    <span class="history-time">${item.timestamp}</span>
                    <button class="history-del-btn" title="Delete entry" type="button">×</button>
                </div>
            </div>
            <p class="history-preview">${escapeHtml(item.text)}</p>
            <div class="history-item-meta">
                <span>${escapeHtml(item.lang || (isTts ? "English" : (isStt ? "Dictation" : "Sign")))}</span>
                <span>${item.words || 0} ${appLang === "ta" ? "வார்த்தைகள்" : "words"}</span>
            </div>
        `;

        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("history-del-btn")) return;
            openHistoryItem(item);
        });

        const delBtn = card.querySelector(".history-del-btn");
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteHistoryItem(item.id);
        });

        historyList.appendChild(card);
    });
}

// History search & filter wiring
if (historySearchInput) {
    historySearchInput.addEventListener("input", () => {
        historySearchQuery = historySearchInput.value.trim().toLowerCase();
        if (clearHistorySearchBtn) {
            clearHistorySearchBtn.classList.toggle("hidden", !historySearchQuery);
        }
        renderHistory();
    });
}
if (clearHistorySearchBtn) {
    clearHistorySearchBtn.addEventListener("click", () => {
        historySearchInput.value = "";
        historySearchQuery = "";
        clearHistorySearchBtn.classList.add("hidden");
        renderHistory();
    });
}
function setHistoryFilter(type) {
    historyFilterType = type;
    [filterAllBtn, filterTtsBtn, filterSttBtn, filterSignBtn].forEach(btn => {
        if (btn) btn.classList.remove("active");
    });
    const activeBtn = type === "all" ? filterAllBtn : (type === "tts" ? filterTtsBtn : (type === "stt" ? filterSttBtn : filterSignBtn));
    if (activeBtn) activeBtn.classList.add("active");
    renderHistory();
}
if (filterAllBtn) filterAllBtn.addEventListener("click", () => setHistoryFilter("all"));
if (filterTtsBtn) filterTtsBtn.addEventListener("click", () => setHistoryFilter("tts"));
if (filterSttBtn) filterSttBtn.addEventListener("click", () => setHistoryFilter("stt"));
if (filterSignBtn) filterSignBtn.addEventListener("click", () => setHistoryFilter("sign"));

function addHistoryItem(data) {
    if (!data.text || !data.text.trim()) return;
    const trimmed = data.text.trim();

    if (workHistory.length > 0 && workHistory[0].text === trimmed && workHistory[0].type === data.type) {
        return;
    }

    const words = trimmed.split(/\s+/).filter(w => w.length > 0).length;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newItem = {
        id: Date.now() + Math.random().toString(36).substring(2, 6),
        type: data.type,
        text: trimmed,
        lang: data.lang || "English",
        voice: data.voice || "Default",
        speed: data.speed || "1",
        pitch: data.pitch || "1",
        volume: data.volume || "1",
        words: words,
        timestamp: timeStr,
        createdAt: now.getTime()
    };

    workHistory.unshift(newItem);
    if (workHistory.length > 30) {
        workHistory.pop();
    }
    saveHistory();
    renderHistory();
}

function deleteHistoryItem(id) {
    workHistory = workHistory.filter(item => item.id !== id);
    saveHistory();
    renderHistory();
}

function clearAllHistory() {
    if (workHistory.length === 0) return;
    const confirmMsg = appLang === "ta" ? "அனைத்துப் பணி வரலாற்றையும் அழிக்கவா?" : "Clear all saved work history?";
    if (confirm(confirmMsg)) {
        workHistory = [];
        saveHistory();
        renderHistory();
    }
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearAllHistory);
}

function openHistoryItem(item) {
    if (item.type === "tts") {
        textInput.value = item.text;
        updateTtsCounts();

        if (item.speed) speed.value = item.speed;
        if (item.pitch) pitch.value = item.pitch;
        if (item.volume) volume.value = item.volume;
        speedValue.textContent = `${parseFloat(speed.value).toFixed(1)}x`;
        pitchValue.textContent = parseFloat(pitch.value).toFixed(1);
        volumeValue.textContent = `${Math.round(volume.value * 100)}%`;

        switchView("tts");
        statusText.textContent = appLang === "ta"
            ? `வரலாற்றிலிருந்து ஏற்றப்பட்டது (${item.timestamp}).`
            : `Loaded from history (${item.timestamp}). Click 'Convert to Speech' to play.`;
    } else if (item.type === "stt") {
        sttTranscriptInput.value = item.text;
        updateSttCounts();

        switchView("stt");
        sttStatusText.textContent = appLang === "ta"
            ? `வரலாற்றிலிருந்து உரை ஏற்றப்பட்டது (${item.timestamp}).`
            : `Loaded transcript from history (${item.timestamp}).`;
    } else if (item.type === "sign") {
        if (signTextInput) signTextInput.value = item.text;
        switchView("sign");
    }
}

/* ========================================================
   VIEW ROUTING / SCREEN SWITCHING
   ======================================================== */
function switchView(viewName) {
    // If leaving sign view and camera is active, turn off camera to preserve resources
    if (currentView === "sign" && viewName !== "sign" && isCameraRunning) {
        stopCameraStream();
    }

    currentView = viewName;
    const t = translations[appLang] || translations.en;

    dashboardView.classList.add("hidden-view");
    ttsView.classList.add("hidden-view");
    sttView.classList.add("hidden-view");
    if (signView) signView.classList.add("hidden-view");

    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    if (viewName === "tts") {
        ttsView.classList.remove("hidden-view");
        if (navTts) navTts.classList.add("active");
        topbarCategory.textContent = appLang === "ta" ? "ஸ்டுடியோ பயன்முறை" : "STUDIO MODE";
        topbarTitle.textContent = t.ttsStudioTitle;
        window.location.hash = "tts";
    } else if (viewName === "stt") {
        sttView.classList.remove("hidden-view");
        if (navStt) navStt.classList.add("active");
        topbarCategory.textContent = appLang === "ta" ? "ஸ்டுடியோ பயன்முறை" : "STUDIO MODE";
        topbarTitle.textContent = t.sttStudioTitle;
        window.location.hash = "stt";
    } else if (viewName === "sign") {
        if (signView) signView.classList.remove("hidden-view");
        if (navSign) navSign.classList.add("active");
        topbarCategory.textContent = appLang === "ta" ? "ஸ்டுடியோ பயன்முறை" : "STUDIO MODE";
        topbarTitle.textContent = t.signStudioTitle;
        window.location.hash = "sign";
        if (typeof renderQuickSignPads === "function") renderQuickSignPads();
    } else {
        dashboardView.classList.remove("hidden-view");
        if (navDashboard) navDashboard.classList.add("active");
        topbarCategory.textContent = t.topbarWelcome;
        topbarTitle.textContent = t.topbarTitle;
        window.location.hash = "dashboard";
        showDashStep(1);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

if (btnLaunchTts) btnLaunchTts.addEventListener("click", () => switchView("tts"));
if (btnLaunchStt) btnLaunchStt.addEventListener("click", () => switchView("stt"));
if (btnLaunchSign) btnLaunchSign.addEventListener("click", () => switchView("sign"));
if (cardSelectTts) {
    cardSelectTts.addEventListener("click", (e) => {
        if (e.target !== btnLaunchTts && !btnLaunchTts.contains(e.target)) switchView("tts");
    });
}
if (cardSelectStt) {
    cardSelectStt.addEventListener("click", (e) => {
        if (e.target !== btnLaunchStt && !btnLaunchStt.contains(e.target)) switchView("stt");
    });
}
if (cardSelectSign) {
    cardSelectSign.addEventListener("click", (e) => {
        if (e.target !== btnLaunchSign && !btnLaunchSign.contains(e.target)) switchView("sign");
    });
}

if (btnBackFromTts) btnBackFromTts.addEventListener("click", () => switchView("dashboard"));
if (btnBackFromStt) btnBackFromStt.addEventListener("click", () => switchView("dashboard"));
if (btnBackFromSign) btnBackFromSign.addEventListener("click", () => switchView("dashboard"));

if (navDashboard) {
    navDashboard.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("dashboard");
    });
}
if (navTts) {
    navTts.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("tts");
    });
}
if (navStt) {
    navStt.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("stt");
    });
}
if (navSign) {
    navSign.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("sign");
    });
}
if (navVoiceLib) {
    navVoiceLib.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("tts");
        setTimeout(() => voiceSelect.focus(), 200);
        statusText.textContent = `Voice Library: ${voices.length} voices loaded in your browser.`;
    });
}
if (navSettings) {
    navSettings.addEventListener("click", (e) => {
        e.preventDefault();
        switchView("tts");
        setTimeout(() => speed.focus(), 200);
        statusText.textContent = "Adjust speed, pitch, and volume configuration.";
    });
}

window.addEventListener("load", () => {
    loadHistory();
    setAppLanguage(appLang);

    const hash = window.location.hash.replace("#", "");
    if (hash === "tts") {
        switchView("tts");
    } else if (hash === "stt") {
        switchView("stt");
    } else if (hash === "sign") {
        switchView("sign");
    } else {
        switchView("dashboard");
    }
});

window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "tts" && currentView !== "tts") {
        switchView("tts");
    } else if (hash === "stt" && currentView !== "stt") {
        switchView("stt");
    } else if (hash === "sign" && currentView !== "sign") {
        switchView("sign");
    } else if (hash === "dashboard" && currentView !== "dashboard") {
        switchView("dashboard");
    }
});

/* ========================================================
   TEXT TO SPEECH (TTS) LOGIC
   ======================================================== */
function updateTtsCounts() {
    const text = textInput.value;
    charCount.textContent = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordLabel = appLang === "ta" ? (words.length === 1 ? "வார்த்தை" : "வார்த்தைகள்") : (words.length === 1 ? "word" : "words");
    wordCount.textContent = `${words.length} ${wordLabel}`;
}

textInput.addEventListener("input", updateTtsCounts);

if (pasteBtn) {
    pasteBtn.addEventListener("click", async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (clipboardText) {
                textInput.value = (textInput.value ? textInput.value + " " : "") + clipboardText;
                updateTtsCounts();
                statusText.textContent = appLang === "ta" ? "உரை ஒட்டப்பட்டது." : "Pasted text from clipboard.";
            } else {
                statusText.textContent = appLang === "ta" ? "கிளிப்போர்டு காலியாக உள்ளது." : "Clipboard is empty.";
            }
        } catch (err) {
            textInput.focus();
            statusText.textContent = "Press Ctrl+V to paste your text.";
        }
    });
}

if (sampleBtn) {
    sampleBtn.addEventListener("click", () => {
        if (appLang === "ta") {
            textInput.value = "வணக்கம்! VocaElite ஸ்பீச் ஸ்டுடியோவுக்கு நல்வரவு. இந்த செயலி நீங்கள் உள்ளிடும் தமிழ் உரையை இயல்பான பேச்சாக மாற்றும். உங்கள் விருப்பத்திற்கு ஏற்ப பேச்சு வேகம், சுருதி மற்றும் ஒலியளவை மாற்றியமைத்துக் கொள்ளலாம்.";
        } else {
            textInput.value = "Welcome to VocaElite Speech Studio. This application converts your written text into lifelike natural speech across multiple languages. You can fine-tune speech speed, pitch, and volume to create the perfect voice output.";
        }
        updateTtsCounts();
        statusText.textContent = appLang === "ta" ? "மாதிரி உரை ஏற்றப்பட்டது. பேச்சாக மாற்று என்பதை அழுத்தவும்." : "Sample text loaded. Select a voice and click Convert to Speech.";
    });
}

function loadVoices() {
    if (!hasTTS) return;

    voices = window.speechSynthesis.getVoices();
    const previouslySelectedVoice = voiceSelect.selectedOptions[0]?.getAttribute("data-voice-name");
    voiceSelect.innerHTML = "";

    const selectedLanguage = languageSelect.value.toLowerCase().replace("_", "-");

    const matchingVoices = voices.filter(voice => {
        const voiceLang = (voice.lang || "").toLowerCase().replace("_", "-");
        return voiceLang.startsWith(selectedLanguage) || (selectedLanguage.length === 2 && voiceLang.startsWith(selectedLanguage + "-"));
    });

    const voicesToDisplay = matchingVoices.length > 0 ? matchingVoices : voices;

    if (matchingVoices.length === 0 && voices.length > 0) {
        const noticeOption = document.createElement("option");
        noticeOption.disabled = true;
        const langName = languageSelect.options[languageSelect.selectedIndex]?.text || "";
        noticeOption.textContent = appLang === "ta"
            ? `── ${langName} குரல்கள் கிடைக்கவில்லை (அனைத்தும் காட்டப்படுகிறது) ──`
            : `── No native ${langName} voices found (showing all) ──`;
        voiceSelect.appendChild(noticeOption);
    }

    voicesToDisplay.forEach((voice) => {
        const option = document.createElement("option");
        option.value = voices.indexOf(voice);
        option.setAttribute("data-voice-name", voice.name);
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? " — Default" : ""}`;
        voiceSelect.appendChild(option);
    });

    if (voicesToDisplay.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Default Browser Voice";
        voiceSelect.appendChild(option);
    } else if (previouslySelectedVoice) {
        for (let i = 0; i < voiceSelect.options.length; i++) {
            if (voiceSelect.options[i].getAttribute("data-voice-name") === previouslySelectedVoice) {
                voiceSelect.selectedIndex = i;
                break;
            }
        }
    }
}

if (hasTTS) {
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.addEventListener("voiceschanged", loadVoices);
    }
    loadVoices();
}

languageSelect.addEventListener("change", () => {
    loadVoices();
    const langName = languageSelect.options[languageSelect.selectedIndex]?.text;
    statusText.textContent = appLang === "ta" ? `மொழி ${langName} என மாற்றப்பட்டது.` : `Language changed to ${langName}.`;
});

speed.addEventListener("input", () => {
    speedValue.textContent = `${parseFloat(speed.value).toFixed(1)}x`;
});

pitch.addEventListener("input", () => {
    pitchValue.textContent = parseFloat(pitch.value).toFixed(1);
});

volume.addEventListener("input", () => {
    volumeValue.textContent = `${Math.round(volume.value * 100)}%`;
});

function stopSpeaking() {
    if (hasTTS) {
        window.speechSynthesis.cancel();
    }
    clearInterval(progressInterval);
    clearInterval(keepAliveInterval);
    isSpeaking = false;
    isPaused = false;
    playPauseBtn.textContent = "▶";
    playerTime.textContent = appLang === "ta" ? "நிறுத்தப்பட்டது" : "STOPPED";
    progressBar.style.width = "0%";
}

function speakText() {
    const text = textInput.value.trim();

    if (!text) {
        statusText.textContent = appLang === "ta" ? "⚠ தயவுசெய்து முதலில் உரையை உள்ளிடவும்." : "⚠ Please enter some text first.";
        textInput.focus();
        return;
    }

    if (!hasTTS) {
        statusText.textContent = "⚠ Speech synthesis is not supported in this browser.";
        return;
    }

    stopSpeaking();

    // Save to Work History
    addHistoryItem({
        type: "tts",
        text: text,
        lang: languageSelect.options[languageSelect.selectedIndex]?.text || "English",
        voice: voiceSelect.selectedOptions[0]?.textContent || "Default",
        speed: speed.value,
        pitch: pitch.value,
        volume: volume.value
    });

    currentSpeech = new SpeechSynthesisUtterance(text);
    currentSpeech.lang = languageSelect.value;

    const voiceIndex = parseInt(voiceSelect.value);
    if (!isNaN(voiceIndex) && voices[voiceIndex]) {
        currentSpeech.voice = voices[voiceIndex];
    }

    currentSpeech.rate = parseFloat(speed.value);
    currentSpeech.pitch = parseFloat(pitch.value);
    currentSpeech.volume = parseFloat(volume.value);

    currentSpeech.onstart = () => {
        isSpeaking = true;
        isPaused = false;
        playerCard.classList.remove("hidden");
        playPauseBtn.textContent = "⏸";
        playerTime.textContent = appLang === "ta" ? "ஒலிக்கிறது" : "PLAYING";
        statusText.textContent = appLang === "ta" ? "உரை பேச்சாக மாற்றப்படுகிறது..." : "Converting words into speech...";

        clearInterval(keepAliveInterval);
        keepAliveInterval = setInterval(() => {
            if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 10000);
    };

    currentSpeech.onboundary = (event) => {
        if (text.length > 0 && typeof event.charIndex === "number") {
            const pct = Math.min(Math.round((event.charIndex / text.length) * 100), 98);
            progressBar.style.width = `${pct}%`;
        }
    };

    currentSpeech.onend = () => {
        isSpeaking = false;
        isPaused = false;
        clearInterval(keepAliveInterval);
        clearInterval(progressInterval);
        playPauseBtn.textContent = "▶";
        playerTime.textContent = appLang === "ta" ? "முடிந்தது" : "COMPLETED";
        progressBar.style.width = "100%";
        statusText.textContent = appLang === "ta" ? "பேச்சு வெற்றிகரமாக மாற்றப்பட்டது." : "Speech conversion completed successfully.";
    };

    currentSpeech.onerror = (event) => {
        clearInterval(keepAliveInterval);
        clearInterval(progressInterval);
        if (event.error === "canceled" || event.error === "interrupted") {
            return;
        }
        isSpeaking = false;
        isPaused = false;
        statusText.textContent = "Speech error: " + event.error;
    };

    progressBar.style.width = "0%";
    let progress = 0;
    const wordsCount = text.split(/\s+/).filter(w => w.length > 0).length;
    const estDurationSec = Math.max((wordsCount / (150 * parseFloat(speed.value))) * 60, 2);
    const tickIntervalMs = (estDurationSec * 1000) / 100;

    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (!isSpeaking) {
            clearInterval(progressInterval);
            return;
        }
        if (!isPaused && progress < 95) {
            progress += 1;
            progressBar.style.width = `${progress}%`;
        }
    }, Math.max(tickIntervalMs, 50));

    window.speechSynthesis.speak(currentSpeech);
}

speakBtn.addEventListener("click", speakText);

stopBtn.addEventListener("click", () => {
    stopSpeaking();
    statusText.textContent = appLang === "ta" ? "பேச்சு நிறுத்தப்பட்டது." : "Speech stopped.";
});

playPauseBtn.addEventListener("click", () => {
    if (!hasTTS) return;

    if (!isSpeaking) {
        speakText();
        return;
    }

    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        isPaused = false;
        playPauseBtn.textContent = "⏸";
        playerTime.textContent = appLang === "ta" ? "ஒலிக்கிறது" : "PLAYING";
        statusText.textContent = appLang === "ta" ? "மீண்டும் ஒலிக்கிறது." : "Speech resumed.";
    } else {
        window.speechSynthesis.pause();
        isPaused = true;
        playPauseBtn.textContent = "▶";
        playerTime.textContent = appLang === "ta" ? "இடைநிறுத்தப்பட்டது" : "PAUSED";
        statusText.textContent = appLang === "ta" ? "இடைநிறுத்தப்பட்டது." : "Speech paused.";
    }
});

clearBtn.addEventListener("click", () => {
    stopSpeaking();
    textInput.value = "";
    updateTtsCounts();
    progressBar.style.width = "0%";
    playerCard.classList.add("hidden");
    statusText.textContent = appLang === "ta" ? "உரை அழிக்கப்பட்டது." : "Text cleared. Type or paste your text to begin.";
});

/* ========================================================
   SPEECH TO TEXT (STT) LOGIC
   ======================================================== */
function updateSttCounts() {
    const text = sttTranscriptInput.value;
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (appLang === "ta") {
        sttCharCount.textContent = `${chars} எழுத்துகள்`;
        sttWordCount.textContent = `${words} வார்த்தைகள்`;
    } else {
        sttCharCount.textContent = `${chars} ${chars === 1 ? "character" : "characters"}`;
        sttWordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;
    }
}

sttTranscriptInput.addEventListener("input", updateSttCounts);

function initRecognition() {
    if (!SpeechRecognition) return null;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = sttLanguageSelect.value || (appLang === "ta" ? "ta-IN" : "en-US");

    rec.onstart = () => {
        isDictating = true;
        sttToggleBtn.classList.add("recording");
        sttMicCircle.classList.add("recording");
        sttSoundWave.classList.add("listening");
        sttToggleText.textContent = appLang === "ta" ? "பேச்சை நிறுத்து" : "Stop Dictation";
        sttStatusDot.style.background = "#ef4444";
        sttStatusDot.style.boxShadow = "0 0 12px #ef4444";
        const langName = sttLanguageSelect.options[sttLanguageSelect.selectedIndex]?.text || "Tamil";
        sttStatusText.textContent = appLang === "ta"
            ? `🎙 ${langName} மொழியில் கேட்கிறது... மைக்ரோஃபோனில் பேசவும்.`
            : `🎙 Listening in ${langName}... Speak into your microphone.`;

        dictationBaseText = sttTranscriptInput.value;
        if (dictationBaseText && !dictationBaseText.endsWith(" ") && !dictationBaseText.endsWith("\n")) {
            dictationBaseText += " ";
        }
    };

    rec.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript) {
            dictationBaseText += finalTranscript + " ";
        }

        sttTranscriptInput.value = (dictationBaseText + interimTranscript).trimStart();
        updateSttCounts();
        sttTranscriptInput.scrollTop = sttTranscriptInput.scrollHeight;
    };

    rec.onerror = (event) => {
        if (event.error === "no-speech") {
            return;
        }
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
            sttStatusText.textContent = appLang === "ta"
                ? "⚠ மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. உலாவியில் அனுமதியை வழங்கவும்."
                : "⚠ Microphone permission denied. Please allow microphone access in your browser.";
        } else if (event.error === "network") {
            sttStatusText.textContent = "⚠ Network error during speech recognition.";
        } else {
            sttStatusText.textContent = `Dictation notice: ${event.error}`;
        }
        stopDictation();
    };

    rec.onend = () => {
        if (isDictating && shouldKeepDictating) {
            try {
                rec.start();
                return;
            } catch (err) {}
        }
        stopDictationUI();
    };

    return rec;
}

function startDictation() {
    if (!hasSTT) {
        sttStatusText.textContent = "⚠ Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.";
        return;
    }

    if (!recognition) {
        recognition = initRecognition();
    }

    if (recognition) {
        recognition.lang = sttLanguageSelect.value || (appLang === "ta" ? "ta-IN" : "en-US");
        shouldKeepDictating = true;
        try {
            recognition.start();
        } catch (e) {
            try {
                recognition.stop();
                setTimeout(() => {
                    if (shouldKeepDictating) recognition.start();
                }, 100);
            } catch (err) {}
        }
    }
}

function stopDictation() {
    shouldKeepDictating = false;
    isDictating = false;
    if (recognition) {
        try {
            recognition.stop();
        } catch (e) {}
    }

    // Save to Work History
    if (sttTranscriptInput.value.trim().length > 0) {
        addHistoryItem({
            type: "stt",
            text: sttTranscriptInput.value.trim(),
            lang: sttLanguageSelect.options[sttLanguageSelect.selectedIndex]?.text || (appLang === "ta" ? "Tamil" : "English")
        });
    }

    stopDictationUI();
}

function stopDictationUI() {
    isDictating = false;
    sttToggleBtn.classList.remove("recording");
    sttMicCircle.classList.remove("recording");
    sttSoundWave.classList.remove("listening");
    sttToggleText.textContent = appLang === "ta" ? "பேசத் தொடங்கு" : "Start Dictation";
    sttStatusDot.style.background = "var(--green)";
    sttStatusDot.style.boxShadow = "0 0 12px var(--green)";
    sttStatusText.textContent = appLang === "ta"
        ? "பேச்சு நிறுத்தப்பட்டது. உரையை நகலெடுக்கலாம் அல்லது பதிவிறக்கலாம்."
        : "Dictation stopped. Edit, copy, or download your transcript.";
}

sttToggleBtn.addEventListener("click", () => {
    if (isDictating) {
        stopDictation();
    } else {
        startDictation();
    }
});

sttMicCircle.addEventListener("click", () => {
    if (isDictating) {
        stopDictation();
    } else {
        startDictation();
    }
});

sttLanguageSelect.addEventListener("change", () => {
    if (isDictating && recognition) {
        shouldKeepDictating = true;
        recognition.stop();
        setTimeout(() => {
            if (shouldKeepDictating) {
                recognition.lang = sttLanguageSelect.value;
                recognition.start();
            }
        }, 150);
    } else {
        const langName = sttLanguageSelect.options[sttLanguageSelect.selectedIndex].text;
        sttStatusText.textContent = appLang === "ta" ? `மொழி ${langName} என மாற்றப்பட்டது.` : `Dictation language set to ${langName}.`;
    }
});

copyTranscriptBtn.addEventListener("click", async () => {
    const text = sttTranscriptInput.value;
    if (!text.trim()) {
        sttStatusText.textContent = appLang === "ta" ? "⚠ நகலெடுக்க உரை இல்லை!" : "⚠ Nothing to copy! Dictate some text first.";
        return;
    }

    addHistoryItem({
        type: "stt",
        text: text,
        lang: sttLanguageSelect.options[sttLanguageSelect.selectedIndex]?.text || "Tamil"
    });

    try {
        await navigator.clipboard.writeText(text);
        copyTranscriptBtn.textContent = appLang === "ta" ? "✓ நகலெடுக்கப்பட்டது!" : "✓ Copied!";
        sttStatusText.textContent = appLang === "ta" ? "உரை நகலெடுக்கப்பட்டது." : "Transcript copied to clipboard.";
        setTimeout(() => {
            copyTranscriptBtn.textContent = appLang === "ta" ? "📋 உரையை நகலெடு" : "📋 Copy Text";
        }, 2000);
    } catch (err) {
        sttTranscriptInput.select();
        document.execCommand("copy");
        copyTranscriptBtn.textContent = appLang === "ta" ? "✓ நகலெடுக்கப்பட்டது!" : "✓ Copied!";
        sttStatusText.textContent = appLang === "ta" ? "உரை நகலெடுக்கப்பட்டது." : "Transcript copied to clipboard.";
        setTimeout(() => {
            copyTranscriptBtn.textContent = appLang === "ta" ? "📋 உரையை நகலெடு" : "📋 Copy Text";
        }, 2000);
    }
});

downloadTranscriptBtn.addEventListener("click", () => {
    const text = sttTranscriptInput.value.trim();
    if (!text) {
        sttStatusText.textContent = appLang === "ta" ? "⚠ பதிவிறக்க உரை இல்லை!" : "⚠ Nothing to download! Dictate some text first.";
        return;
    }

    addHistoryItem({
        type: "stt",
        text: text,
        lang: sttLanguageSelect.options[sttLanguageSelect.selectedIndex]?.text || "Tamil"
    });

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `VocaElite_transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sttStatusText.textContent = appLang === "ta" ? "உரைக்கோப்பு பதிவிறக்கப்பட்டது." : "Transcript downloaded successfully.";
});

sendToTtsBtn.addEventListener("click", () => {
    const text = sttTranscriptInput.value.trim();
    if (!text) {
        sttStatusText.textContent = appLang === "ta" ? "⚠ அனுப்ப உரை இல்லை!" : "⚠ No text to send! Dictate some text first.";
        return;
    }

    if (isDictating) stopDictation();

    addHistoryItem({
        type: "stt",
        text: text,
        lang: sttLanguageSelect.options[sttLanguageSelect.selectedIndex]?.text || "Tamil"
    });

    textInput.value = text;
    updateTtsCounts();

    const sttLang = sttLanguageSelect.value;
    for (let i = 0; i < languageSelect.options.length; i++) {
        if (languageSelect.options[i].value === sttLang) {
            languageSelect.selectedIndex = i;
            loadVoices();
            break;
        }
    }

    switchView("tts");
    statusText.textContent = appLang === "ta"
        ? "உரை Text-to-Speech-ல் ஏற்றப்பட்டது. குரலைத் தேர்வுசெய்து மாற்றவும்."
        : "Transcript loaded into Text to Speech. Select voice and convert.";
});

clearTranscriptBtn.addEventListener("click", () => {
    if (isDictating) stopDictation();
    sttTranscriptInput.value = "";
    updateSttCounts();
    sttStatusText.textContent = appLang === "ta" ? "உரை அழிக்கப்பட்டது." : "Transcript cleared. Click Start Dictation to begin.";
});


/* ========================================================
   SIGN LANGUAGE TO VOICE & TEXT (SIGN STUDIO ENGINE)
   ======================================================== */

// --- PRESET SIGN DICTIONARIES ---
const COMMON_SIGNS = [
    { id: "hello", en: "Hello", ta: "வணக்கம்", icon: "👋", category: "Greeting", desc: "Open palm facing camera, fingers upright" },
    { id: "thankyou", en: "Thank You", ta: "நன்றி", icon: "🙏", category: "Courtesy", desc: "Open palm from chin moving forward, or hands together" },
    { id: "yes", en: "Yes", ta: "ஆம்", icon: "✊", category: "Response", desc: "Closed fist nodding like a head" },
    { id: "no", en: "No", ta: "இல்லை", icon: "🤏", category: "Response", desc: "Index and middle fingers snapping closed onto thumb" },
    { id: "iloveyou", en: "I Love You", ta: "நான் உன்னை விரும்புகிறேன்", icon: "🤟", category: "Affection", desc: "Thumb, index and pinky extended, middle and ring folded" },
    { id: "peace", en: "Peace / Victory", ta: "அமைதி", icon: "✌️", category: "Symbol", desc: "Index and middle fingers extended in a V shape" },
    { id: "good", en: "Good", ta: "நல்லது", icon: "👍", category: "Expression", desc: "Closed fist with thumb pointing straight up" },
    { id: "bad", en: "Bad", ta: "சரியில்லை", icon: "👎", category: "Expression", desc: "Closed fist with thumb pointing straight down" },
    { id: "help", en: "Help", ta: "உதவி", icon: "🆘", category: "Emergency", desc: "Closed fist resting upright on open flat palm" },
    { id: "stop", en: "Stop / Wait", ta: "நில்", icon: "✋", category: "Action", desc: "Flat palm facing directly forward" },
    { id: "ok", en: "Okay", ta: "சரி", icon: "👌", category: "Agreement", desc: "Thumb and index tips touching in circle, others extended" },
    { id: "call", en: "Call Me", ta: "தொடர்பு கொள்", icon: "🤙", category: "Phrase", desc: "Thumb and pinky extended outward (Shaka)" },
    { id: "rock", en: "Rock / Great", ta: "அருமை", icon: "🤘", category: "Emotion", desc: "Index and pinky fingers up, middle and ring down" },
    { id: "point", en: "Look / One", ta: "பார் / ஒன்று", icon: "☝️", category: "Pointer", desc: "Index finger extended straight up" },
    { id: "food", en: "Food / Eat", ta: "சாப்பாடு", icon: "🍽️", category: "Daily", desc: "Fingers pinched touching near mouth" },
    { id: "water", en: "Water", ta: "தண்ணீர்", icon: "💧", category: "Daily", desc: "Three middle fingers upright in W shape near chin" }
];

const ASL_ALPHABET = [
    { id: "a", en: "A", ta: "ஏ (A)", icon: "✊", category: "Alphabet", desc: "Fist with thumb resting beside index finger" },
    { id: "b", en: "B", ta: "பி (B)", icon: "🖐️", category: "Alphabet", desc: "Four fingers up together, thumb folded across palm" },
    { id: "c", en: "C", ta: "சி (C)", icon: "🫲", category: "Alphabet", desc: "Fingers curved forming a C shape" },
    { id: "d", en: "D", ta: "டி (D)", icon: "☝️", category: "Alphabet", desc: "Index finger points up, other fingers touch thumb" },
    { id: "e", en: "E", ta: "இ (E)", icon: "✊", category: "Alphabet", desc: "All fingertips curled resting on top of thumb" },
    { id: "f", en: "F", ta: "எஃப் (F)", icon: "👌", category: "Alphabet", desc: "Thumb and index touch in circle, 3 fingers up" },
    { id: "g", en: "G", ta: "ஜி (G)", icon: "👉", category: "Alphabet", desc: "Index and thumb point horizontally parallel" },
    { id: "h", en: "H", ta: "ஹெச் (H)", icon: "👉", category: "Alphabet", desc: "Index and middle fingers extend horizontally" },
    { id: "i", en: "I", ta: "ஐ (I)", icon: "🤙", category: "Alphabet", desc: "Pinky finger points straight up, others closed" },
    { id: "k", en: "K", ta: "கே (K)", icon: "✌️", category: "Alphabet", desc: "Index up, middle forward, thumb between them" },
    { id: "l", en: "L", ta: "எல் (L)", icon: "👆", category: "Alphabet", desc: "Index up and thumb out forming an L shape" },
    { id: "m", en: "M", ta: "எம் (M)", icon: "✊", category: "Alphabet", desc: "Three fingers folded over thumb" },
    { id: "n", en: "N", ta: "என் (N)", icon: "✊", category: "Alphabet", desc: "Two fingers folded over thumb" },
    { id: "o", en: "O", ta: "ஓ (O)", icon: "⭕", category: "Alphabet", desc: "All fingers touch thumb forming an O" },
    { id: "p", en: "P", ta: "பி (P)", icon: "👇", category: "Alphabet", desc: "K handshape pointing downward" },
    { id: "q", en: "Q", ta: "க்யூ (Q)", icon: "👇", category: "Alphabet", desc: "G handshape pointing downward" },
    { id: "r", en: "R", ta: "ஆர் (R)", icon: "🤞", category: "Alphabet", desc: "Index and middle fingers crossed" },
    { id: "s", en: "S", ta: "எஸ் (S)", icon: "✊", category: "Alphabet", desc: "Fist with thumb wrapped across front of fingers" },
    { id: "t", en: "T", ta: "டி (T)", icon: "✊", category: "Alphabet", desc: "Thumb tucked between index and middle fingers" },
    { id: "u", en: "U", ta: "யு (U)", icon: "✌️", category: "Alphabet", desc: "Index and middle fingers held up together" },
    { id: "v", en: "V", ta: "வி (V)", icon: "✌️", category: "Alphabet", desc: "Index and middle fingers held up spread apart" },
    { id: "w", en: "W", ta: "டபிள்யூ (W)", icon: "🖖", category: "Alphabet", desc: "Index, middle, and ring fingers held up spread" },
    { id: "x", en: "X", ta: "எக்ஸ் (X)", icon: "☝️", category: "Alphabet", desc: "Index finger bent like a hook" },
    { id: "y", en: "Y", ta: "ஒய் (Y)", icon: "🤙", category: "Alphabet", desc: "Thumb and pinky extended, middle 3 curled" },
    { id: "z", en: "Z", ta: "இசட் (Z)", icon: "☝️", category: "Alphabet", desc: "Index finger traces Z in the air" }
];

let selectedSign = COMMON_SIGNS[0];
let isCameraRunning = false;
let cameraStream = null;
let cameraFacingMode = "user";
let mediaPipeHandsInstance = null;
let cameraFrameReqId = null;

// Real-time gesture debounce & confirmation
let lastDetectedSignId = null;
let detectionStreak = 0;
const DETECTION_CONFIRM_THRESHOLD = 12; // ~0.4s to 0.5s hold
let lastConfirmedTimestamp = 0;
const COOLDOWN_MS = 1600;

// --- QUICK SIGN PAD RENDERING ---
function renderQuickSignPads() {
    if (!phrasesGrid || !alphabetGrid) return;

    // Render Phrases
    phrasesGrid.innerHTML = "";
    COMMON_SIGNS.forEach(sign => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sign-chip-btn";
        if (selectedSign && selectedSign.id === sign.id) btn.classList.add("active");

        const displayLabel = appLang === "ta" ? sign.ta : sign.en;
        const subLabel = appLang === "ta" ? sign.en : sign.ta;

        btn.innerHTML = `
            <span class="sign-chip-icon">${sign.icon}</span>
            <span class="sign-chip-title">${escapeHtml(displayLabel)}</span>
            <span class="sign-chip-ta">${escapeHtml(subLabel)}</span>
        `;

        btn.addEventListener("click", () => {
            selectSign(sign, "pad");
            appendSignToSentence(sign);
        });

        phrasesGrid.appendChild(btn);
    });

    // Render Alphabet
    alphabetGrid.innerHTML = "";
    ASL_ALPHABET.forEach(sign => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sign-chip-btn";
        if (selectedSign && selectedSign.id === sign.id) btn.classList.add("active");

        btn.innerHTML = `
            <span class="sign-chip-icon">${sign.icon}</span>
            <span class="sign-chip-title">${escapeHtml(sign.en)}</span>
            <span class="sign-chip-ta">${escapeHtml(sign.ta)}</span>
        `;

        btn.addEventListener("click", () => {
            selectSign(sign, "pad");
            appendSignToSentence(sign);
        });

        alphabetGrid.appendChild(btn);
    });

    // Render Modal Cheat Sheet Content
    if (signGuideContent && signGuideContent.children.length === 0) {
        let guideHtml = "";
        COMMON_SIGNS.forEach(s => {
            guideHtml += `
                <div class="sign-guide-item">
                    <div class="sign-guide-item-top">
                        <span class="sign-guide-icon">${s.icon}</span>
                        <div>
                            <h5>${escapeHtml(s.en)}</h5>
                            <span>${escapeHtml(s.ta)}</span>
                        </div>
                    </div>
                    <p>${escapeHtml(s.desc)}</p>
                </div>
            `;
        });
        signGuideContent.innerHTML = guideHtml;
    }
}

// Quick sign pad tabs
if (tabCommonSigns && tabAlphabetSigns) {
    tabCommonSigns.addEventListener("click", () => {
        tabCommonSigns.classList.add("active");
        tabAlphabetSigns.classList.remove("active");
        if (phrasesGrid) phrasesGrid.classList.remove("hidden");
        if (alphabetGrid) alphabetGrid.classList.add("hidden");
    });

    tabAlphabetSigns.addEventListener("click", () => {
        tabAlphabetSigns.classList.add("active");
        tabCommonSigns.classList.remove("active");
        if (phrasesGrid) phrasesGrid.classList.add("hidden");
        if (alphabetGrid) alphabetGrid.classList.remove("hidden");
    });
}

// Sign Guide Modal
if (btnOpenSignGuide && signGuideModal && btnCloseSignGuide) {
    btnOpenSignGuide.addEventListener("click", () => {
        signGuideModal.classList.remove("hidden");
    });
    btnCloseSignGuide.addEventListener("click", () => {
        signGuideModal.classList.add("hidden");
    });
    signGuideModal.addEventListener("click", (e) => {
        if (e.target === signGuideModal) signGuideModal.classList.add("hidden");
    });
}

// --- SELECT SIGN (UPDATE CURRENT GESTURE DISPLAY) ---
function selectSign(sign, source = "pad") {
    selectedSign = sign;

    if (currentSignSymbol) {
        currentSignSymbol.textContent = sign.icon;
        currentSignSymbol.classList.remove("pop");
        void currentSignSymbol.offsetWidth; // trigger reflow
        currentSignSymbol.classList.add("pop");
    }

    if (currentSignEn) currentSignEn.textContent = sign.en;
    if (currentSignTa) currentSignTa.textContent = sign.ta;
    if (signCategoryLabel) signCategoryLabel.textContent = (sign.category || "GESTURE").toUpperCase();
    if (currentSignHint) currentSignHint.textContent = sign.desc || "Sign detected successfully.";

    if (signSourceBadge) {
        signSourceBadge.textContent = source === "vision"
            ? (appLang === "ta" ? "AI கேமரா சைகை" : "AI Vision Detected")
            : (appLang === "ta" ? "சைகைப் பலகை" : "Virtual Sign Pad");
    }

    // Highlight chip in pads
    document.querySelectorAll(".sign-chip-btn").forEach(btn => {
        const titleEl = btn.querySelector(".sign-chip-title");
        if (titleEl && (titleEl.textContent === sign.en || titleEl.textContent === sign.ta)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// --- VOICE SYNTHESIS FOR SIGN LANGUAGE ---
function speakSignVoice(text, forceTamil = false) {
    if (!hasTTS) return;
    if (!text || !text.trim()) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    const isTa = forceTamil || appLang === "ta";

    utterance.lang = isTa ? "ta-IN" : "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick matching voice
    if (voices.length > 0) {
        const match = voices.find(v => isTa ? (v.lang.startsWith("ta") || v.name.toLowerCase().includes("tamil")) : (v.lang.startsWith("en")));
        if (match) utterance.voice = match;
    }

    window.speechSynthesis.speak(utterance);
}

// --- APPEND SIGN TO SENTENCE BUILDER ---
function appendSignToSentence(sign) {
    if (!signTextInput) return;

    const wordToAppend = appLang === "ta" ? sign.ta : sign.en;
    const current = signTextInput.value;

    if (current.trim().length === 0) {
        signTextInput.value = wordToAppend;
    } else {
        // If current text ends with punctuation or space, don't double space
        const needsSpace = !current.endsWith(" ") && !current.endsWith("\n");
        signTextInput.value = current + (needsSpace ? " " : "") + wordToAppend;
    }

    // Auto-speak if enabled
    if (toggleAutoSpeak && toggleAutoSpeak.checked) {
        speakSignVoice(wordToAppend);
    }

    // Auto log to history
    addHistoryItem({
        type: "sign",
        text: signTextInput.value,
        lang: appLang === "ta" ? "Tamil" : "English"
    });
}

// Manual speak current sign
if (btnSpeakCurrentSign) {
    btnSpeakCurrentSign.addEventListener("click", () => {
        if (!selectedSign) return;
        const spokenWord = appLang === "ta" ? selectedSign.ta : selectedSign.en;
        speakSignVoice(spokenWord);
    });
}

// Manual add to sentence
if (btnAppendCurrentSign) {
    btnAppendCurrentSign.addEventListener("click", () => {
        if (!selectedSign) return;
        appendSignToSentence(selectedSign);
    });
}

// Sentence footer buttons
if (btnSignSpace) {
    btnSignSpace.addEventListener("click", () => {
        if (signTextInput) signTextInput.value += " ";
    });
}
if (btnSignBackspace) {
    btnSignBackspace.addEventListener("click", () => {
        if (!signTextInput) return;
        const val = signTextInput.value;
        if (val.length > 0) {
            signTextInput.value = val.slice(0, -1);
        }
    });
}
if (btnSignPeriod) {
    btnSignPeriod.addEventListener("click", () => {
        if (signTextInput) signTextInput.value += ". ";
    });
}
if (btnSignClear) {
    btnSignClear.addEventListener("click", () => {
        if (signTextInput) signTextInput.value = "";
    });
}

// Speak entire sentence
if (btnSpeakSentence) {
    btnSpeakSentence.addEventListener("click", () => {
        if (!signTextInput || !signTextInput.value.trim()) return;
        const text = signTextInput.value.trim();
        speakSignVoice(text);
        addHistoryItem({
            type: "sign",
            text: text,
            lang: appLang === "ta" ? "Tamil" : "English"
        });
    });
}

// Copy sign sentence
if (btnSignCopy) {
    btnSignCopy.addEventListener("click", async () => {
        if (!signTextInput || !signTextInput.value.trim()) {
            alert(appLang === "ta" ? "நகலெடுக்க வாக்கியம் இல்லை!" : "No text to copy!");
            return;
        }
        try {
            await navigator.clipboard.writeText(signTextInput.value.trim());
            const orig = btnSignCopy.textContent;
            btnSignCopy.textContent = appLang === "ta" ? "✓ நகலெடுக்கப்பட்டது!" : "✓ Copied!";
            setTimeout(() => { btnSignCopy.textContent = orig; }, 1800);
        } catch (e) {
            signTextInput.select();
            document.execCommand("copy");
        }
    });
}

// Download sign sentence as .txt
if (btnSignDownload) {
    btnSignDownload.addEventListener("click", () => {
        if (!signTextInput || !signTextInput.value.trim()) {
            alert(appLang === "ta" ? "பதிவிறக்க வாக்கியம் இல்லை!" : "No text to download!");
            return;
        }
        const blob = new Blob([signTextInput.value.trim()], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `VocaElite_Sign_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Send sign sentence to TTS Studio
if (btnSignSendTts) {
    btnSignSendTts.addEventListener("click", () => {
        if (!signTextInput || !signTextInput.value.trim()) {
            alert(appLang === "ta" ? "TTS-க்கு அனுப்ப உரை இல்லை!" : "No text to send to TTS!");
            return;
        }
        const text = signTextInput.value.trim();
        if (textInput) {
            textInput.value = text;
            updateTtsCounts();
        }
        switchView("tts");
        if (statusText) {
            statusText.textContent = appLang === "ta"
                ? "சைகை உரை TTS-ல் ஏற்றப்பட்டது. குரலைத் தேர்வுசெய்து மாற்றவும்."
                : "Sign transcript loaded into Text to Speech. Select voice and convert.";
        }
    });
}


/* ========================================================
   CAMERA & MEDIAPIPE HAND GESTURE RECOGNITION
   ======================================================== */

// Euclidean distance between two 3D landmarks
function landmarkDist(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = (p1.z || 0) - (p2.z || 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Classify gesture from 21 MediaPipe hand landmarks
function classifyHandLandmarks(lm) {
    if (!lm || lm.length < 21) return null;

    const wrist = lm[0];
    const thumbTip = lm[4], thumbIp = lm[3], thumbMcp = lm[2];
    const indexTip = lm[8], indexPip = lm[6], indexMcp = lm[5];
    const middleTip = lm[12], middlePip = lm[10], middleMcp = lm[9];
    const ringTip = lm[16], ringPip = lm[14], ringMcp = lm[13];
    const pinkyTip = lm[20], pinkyPip = lm[18], pinkyMcp = lm[17];

    // Determine finger extensions (distance from wrist)
    const indexExtended = landmarkDist(indexTip, wrist) > landmarkDist(indexPip, wrist) * 1.15;
    const middleExtended = landmarkDist(middleTip, wrist) > landmarkDist(middlePip, wrist) * 1.15;
    const ringExtended = landmarkDist(ringTip, wrist) > landmarkDist(ringPip, wrist) * 1.15;
    const pinkyExtended = landmarkDist(pinkyTip, wrist) > landmarkDist(pinkyPip, wrist) * 1.15;

    // Thumb states
    const thumbSpread = landmarkDist(thumbTip, indexMcp) > landmarkDist(thumbMcp, indexMcp) * 1.25;
    const thumbUp = thumbTip.y < thumbMcp.y - 0.05 && thumbTip.y < indexMcp.y;
    const thumbDown = thumbTip.y > thumbMcp.y + 0.05 && thumbTip.y > wrist.y;

    // Thumb-to-finger touches
    const thumbTouchesIndex = landmarkDist(thumbTip, indexTip) < 0.08;

    // 1. I LOVE YOU (🤟: Thumb, Index, Pinky extended, Middle & Ring down)
    if (thumbSpread && indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "iloveyou");
    }

    // 2. PEACE / VICTORY (✌️: Index & Middle up in V shape, others down)
    if (indexExtended && middleExtended && !ringExtended && !pinkyExtended) {
        const spread = landmarkDist(indexTip, middleTip);
        if (spread > 0.04) {
            return COMMON_SIGNS.find(s => s.id === "peace");
        } else {
            return ASL_ALPHABET.find(s => s.id === "u");
        }
    }

    // 3. OKAY (👌: Thumb & Index touching, Middle, Ring, Pinky extended)
    if (thumbTouchesIndex && middleExtended && ringExtended) {
        return COMMON_SIGNS.find(s => s.id === "ok");
    }

    // 4. CALL ME (🤙: Thumb & Pinky extended, other 3 down)
    if (thumbSpread && !indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "call");
    }

    // 5. ROCK ON (🤘: Index & Pinky extended, others down)
    if (!thumbSpread && indexExtended && !middleExtended && !ringExtended && pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "rock");
    }

    // 6. ASL 'L' (👆: Index up, Thumb out forming L shape)
    if (thumbSpread && indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        return ASL_ALPHABET.find(s => s.id === "l");
    }

    // 7. POINT / ONE (☝️: Only Index extended)
    if (!thumbSpread && indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "point");
    }

    // 8. ASL 'W' / WATER (🖖: Index, Middle, Ring up)
    if (indexExtended && middleExtended && ringExtended && !pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "water") || ASL_ALPHABET.find(s => s.id === "w");
    }

    // 9. THUMBS UP / GOOD (👍: Fist with thumb pointing up)
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbUp) {
        return COMMON_SIGNS.find(s => s.id === "good");
    }

    // 10. THUMBS DOWN / BAD (👎: Fist with thumb pointing down)
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended && thumbDown) {
        return COMMON_SIGNS.find(s => s.id === "bad");
    }

    // 11. YES / FIST (✊: Closed fist)
    if (!indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "yes");
    }

    // 12. HELLO / STOP (👋 / ✋: All 5 fingers extended)
    if (thumbSpread && indexExtended && middleExtended && ringExtended && pinkyExtended) {
        return COMMON_SIGNS.find(s => s.id === "hello");
    }

    // 13. ASL 'B' (Flat palm, thumb folded)
    if (!thumbSpread && indexExtended && middleExtended && ringExtended && pinkyExtended) {
        return ASL_ALPHABET.find(s => s.id === "b");
    }

    // 14. ASL 'C' (Curved hand)
    const curveDist = landmarkDist(thumbTip, indexTip);
    if (curveDist > 0.09 && curveDist < 0.22 && !indexExtended && !middleExtended && !ringExtended) {
        return ASL_ALPHABET.find(s => s.id === "c");
    }

    return null;
}

// MediaPipe Results Callback
function onHandResults(results) {
    if (!signCanvas || !signVideo) return;
    const ctx = signCanvas.getContext("2d");
    signCanvas.width = signVideo.videoWidth || 640;
    signCanvas.height = signVideo.videoHeight || 480;

    ctx.save();
    ctx.clearRect(0, 0, signCanvas.width, signCanvas.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const lm = results.multiHandLandmarks[0];

        // Draw Skeleton Lines (Neon amber / cyan glow)
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
            [0, 5], [5, 6], [6, 7], [7, 8],       // Index
            [5, 9], [9, 10], [10, 11], [11, 12],  // Middle
            [9, 13], [13, 14], [14, 15], [15, 16],// Ring
            [13, 17], [17, 18], [18, 19], [19, 20],// Pinky
            [0, 17]                               // Palm base
        ];

        ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";

        connections.forEach(([i, j]) => {
            const p1 = lm[i];
            const p2 = lm[j];
            ctx.beginPath();
            ctx.moveTo(p1.x * signCanvas.width, p1.y * signCanvas.height);
            ctx.lineTo(p2.x * signCanvas.width, p2.y * signCanvas.height);
            ctx.stroke();
        });

        // Draw Joints
        lm.forEach((p, idx) => {
            ctx.beginPath();
            const radius = (idx === 4 || idx === 8 || idx === 12 || idx === 16 || idx === 20) ? 6 : 4;
            ctx.arc(p.x * signCanvas.width, p.y * signCanvas.height, radius, 0, 2 * Math.PI);
            ctx.fillStyle = idx === 0 ? "#42e8a0" : "#fbbf24";
            ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Classify Gesture
        const detected = classifyHandLandmarks(lm);

        if (detected) {
            if (signHudOverlay) signHudOverlay.classList.remove("hidden");
            if (hudIcon) hudIcon.textContent = detected.icon;
            if (hudSignName) hudSignName.textContent = detected.en;
            if (hudSignSub) hudSignSub.textContent = detected.ta;

            if (detected.id === lastDetectedSignId) {
                detectionStreak++;
            } else {
                lastDetectedSignId = detected.id;
                detectionStreak = 1;
            }

            // Update Progress Bar
            const progressPct = Math.min(100, Math.round((detectionStreak / DETECTION_CONFIRM_THRESHOLD) * 100));
            if (hudConfidenceFill) hudConfidenceFill.style.width = `${progressPct}%`;
            if (hudConfidenceText) {
                hudConfidenceText.textContent = progressPct >= 100
                    ? (appLang === "ta" ? "✓ உறுதி செய்யப்பட்டது!" : "✓ Confirmed!")
                    : (appLang === "ta" ? "உறுதிப்படுத்த கையை அசைக்காமல் வைக்கவும்" : "Hold steady to confirm");
            }

            // Confirm sign if threshold reached and not in cooldown
            const now = Date.now();
            if (detectionStreak >= DETECTION_CONFIRM_THRESHOLD && now - lastConfirmedTimestamp > COOLDOWN_MS) {
                lastConfirmedTimestamp = now;
                selectSign(detected, "vision");
                appendSignToSentence(detected);

                // Flash HUD
                if (hudConfidenceFill) {
                    hudConfidenceFill.style.background = "#42e8a0";
                    setTimeout(() => {
                        if (hudConfidenceFill) hudConfidenceFill.style.background = "linear-gradient(90deg, #f59e0b, #42e8a0)";
                    }, 400);
                }
            }
        } else {
            // Hand visible but gesture not identified
            detectionStreak = Math.max(0, detectionStreak - 1);
            if (hudConfidenceFill) hudConfidenceFill.style.width = "0%";
            if (hudConfidenceText) hudConfidenceText.textContent = appLang === "ta" ? "சைகையை தெளிவாகக் காட்டவும்" : "Show gesture clearly";
        }

    } else {
        // No hands in view
        detectionStreak = 0;
        lastDetectedSignId = null;
        if (hudConfidenceFill) hudConfidenceFill.style.width = "0%";
        if (signHudOverlay) signHudOverlay.classList.add("hidden");
    }

    ctx.restore();
}

// Video Frame Processing Loop
async function processSignVideoFrame() {
    if (!isCameraRunning || !signVideo || signVideo.paused || signVideo.ended) {
        return;
    }
    if (signVideo.readyState >= 2) {
        if (mediaPipeHandsInstance) {
            try {
                await mediaPipeHandsInstance.send({ image: signVideo });
            } catch (err) {
                // Ignore transient frame errors
            }
        }
    }
    if (isCameraRunning) {
        cameraFrameReqId = requestAnimationFrame(processSignVideoFrame);
    }
}

// Start Camera Stream
async function startCameraStream() {
    if (isCameraRunning) return;

    try {
        if (cameraStatusText) cameraStatusText.textContent = appLang === "ta" ? "கேமரா இணைக்கப்படுகிறது..." : "Connecting camera...";

        const constraints = {
            video: {
                facingMode: cameraFacingMode,
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        };

        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        signVideo.srcObject = cameraStream;
        await signVideo.play();

        isCameraRunning = true;
        if (cameraPlaceholder) cameraPlaceholder.classList.add("hidden");
        if (cameraStatusPill) cameraStatusPill.classList.add("active");
        if (cameraStatusText) cameraStatusText.textContent = appLang === "ta" ? "கேமரா இயங்குகிறது (சைகை கண்டறிதல்)" : "Camera Active (Tracking Hands)";

        if (btnToggleCamera) btnToggleCamera.classList.add("stop");
        if (btnToggleCameraText) btnToggleCameraText.textContent = appLang === "ta" ? "கேமராவை நிறுத்து" : "Stop Camera";
        if (btnToggleCameraIcon) btnToggleCameraIcon.textContent = "⏹";

        // Initialize MediaPipe Hands if not already initialized
        if (!mediaPipeHandsInstance && window.Hands) {
            mediaPipeHandsInstance = new window.Hands({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            });
            mediaPipeHandsInstance.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.65,
                minTrackingConfidence: 0.6
            });
            mediaPipeHandsInstance.onResults(onHandResults);
        }

        cameraFrameReqId = requestAnimationFrame(processSignVideoFrame);

    } catch (err) {
        console.error("Camera access error:", err);
        isCameraRunning = false;
        if (cameraPlaceholder) cameraPlaceholder.classList.remove("hidden");
        if (cameraStatusPill) cameraStatusPill.classList.remove("active");
        if (cameraStatusText) cameraStatusText.textContent = appLang === "ta" ? "கேமரா அனுமதி மறுக்கப்பட்டது" : "Camera permission denied";
        alert(appLang === "ta"
            ? "கேமராவை அணுக முடியவில்லை. உலாவி அமைப்புகளில் கேமரா அனுமதியை சரிபார்க்கவும், அல்லது கீழே உள்ள சைகைப் பலகையைப் பயன்படுத்தவும்."
            : "Could not access camera. Please allow camera permissions in browser settings, or use the interactive Quick Sign Pad below.");
    }
}

// Stop Camera Stream
function stopCameraStream() {
    isCameraRunning = false;

    if (cameraFrameReqId) {
        cancelAnimationFrame(cameraFrameReqId);
        cameraFrameReqId = null;
    }

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    if (signVideo) {
        signVideo.srcObject = null;
    }

    if (signCanvas) {
        const ctx = signCanvas.getContext("2d");
        ctx.clearRect(0, 0, signCanvas.width, signCanvas.height);
    }

    if (cameraPlaceholder) cameraPlaceholder.classList.remove("hidden");
    if (cameraStatusPill) cameraStatusPill.classList.remove("active");
    if (cameraStatusText) cameraStatusText.textContent = appLang === "ta" ? "கேமரா அணைக்கப்பட்டுள்ளது" : "Camera Inactive";
    if (signHudOverlay) signHudOverlay.classList.add("hidden");

    if (btnToggleCamera) btnToggleCamera.classList.remove("stop");
    if (btnToggleCameraText) btnToggleCameraText.textContent = appLang === "ta" ? "கேமராவைத் தொடங்கு" : "Start Camera";
    if (btnToggleCameraIcon) btnToggleCameraIcon.textContent = "📹";
}

// Flip Camera (Front / Back on mobile devices)
async function flipCamera() {
    cameraFacingMode = cameraFacingMode === "user" ? "environment" : "user";
    if (isCameraRunning) {
        stopCameraStream();
        await startCameraStream();
    }
}

// Wire Camera Buttons
if (btnToggleCamera) {
    btnToggleCamera.addEventListener("click", () => {
        if (isCameraRunning) {
            stopCameraStream();
        } else {
            startCameraStream();
        }
    });
}

if (btnStartCameraPrompt) {
    btnStartCameraPrompt.addEventListener("click", () => {
        startCameraStream();
    });
}

if (btnFlipCamera) {
    btnFlipCamera.addEventListener("click", flipCamera);
}

// Initialize Quick Sign Pads on load
renderQuickSignPads();
