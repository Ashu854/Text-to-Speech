
const text = document.getElementById("textToConvert");
const toggleBtn = document.getElementById("toggleBtn");
const voiceSelect = document.getElementById("voiceSelect");
let speechSynth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
let isSpeaking = false;

function populateVoiceList() {
    const voices = speechSynth.getVoices();
    voiceSelect.innerHTML = '<option value="">Select Voice</option>';
    voices.forEach(voice => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}

function handleVoicesChanged() {
    populateVoiceList();
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = handleVoicesChanged;
} else {

    setTimeout(populateVoiceList, 100); 
}

toggleBtn.addEventListener('click', function () {
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!enteredText.trim().length) {
        error.textContent = `Nothing to Convert! Enter text in the text area.`;
        return;
    } else {
        error.textContent = "";
    }

    if (!isSpeaking) {
        utterance.text = enteredText;
        const selectedVoice = speechSynth.getVoices().find(voice => voice.name === voiceSelect.value);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        speechSynth.speak(utterance);
        toggleBtn.textContent = "Stop";
        isSpeaking = true;
    } else {
        speechSynth.cancel();
        toggleBtn.textContent = "Play";
        isSpeaking = false;
    }
});

utterance.onend = function () {
    toggleBtn.textContent = "Play";
    isSpeaking = false;
};