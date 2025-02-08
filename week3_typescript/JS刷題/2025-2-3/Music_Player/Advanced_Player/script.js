class AdvancedMusicPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.setupAudioNodes();
        this.setupCanvas();
        this.setupEventListeners();
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.animationFrameId = null;
    }

    setupAudioNodes() {
        // 創建音頻節點
        this.gainNode = this.audioContext.createGain();
        this.analyser = this.audioContext.createAnalyser();
        this.equalizer = this.createEqualizer();

        // 連接節點
        this.gainNode.connect(this.equalizer[0]);
        for (let i = 0; i < this.equalizer.length - 1; i++) {
            this.equalizer[i].connect(this.equalizer[i + 1]);
        }
        this.equalizer[this.equalizer.length - 1].connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        // 設置分析器參數
        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    createEqualizer() {
        const frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
        return frequencies.map(freq => {
            const filter = this.audioContext.createBiquadFilter();
            filter.type = 'peaking';
            filter.frequency.value = freq;
            filter.Q.value = 1;
            filter.gain.value = 0;
            return filter;
        });
    }

    setupCanvas() {
        this.canvas = document.getElementById('visualizer');
        this.canvasCtx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    setupEventListeners() {
        // 音樂文件輸入
        document.getElementById('audioFile').addEventListener('change', (e) => this.handleFileSelect(e));

        // 播放控制
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('prevBtn').addEventListener('click', () => this.playPrevious());
        document.getElementById('nextBtn').addEventListener('click', () => this.playNext());

        // 音量控制
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeIcon = document.querySelector('.volume-icon');
        const volumeValue = document.querySelector('.volume-value');
        
        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.fadeVolume(volume, 0.1);
            
            // 更新音量顯示
            volumeValue.textContent = `${Math.round(volume * 100)}%`;
            volumeSlider.style.setProperty('--volume-percent', `${volume * 100}%`);
            
            // 更新音量圖標
            if (volume === 0) {
                volumeIcon.textContent = '🔇';
                volumeSlider.parentElement.classList.add('muted');
            } else if (volume < 0.5) {
                volumeIcon.textContent = '🔉';
                volumeSlider.parentElement.classList.remove('muted');
            } else {
                volumeIcon.textContent = '🔊';
                volumeSlider.parentElement.classList.remove('muted');
            }
        });

        // 點擊音量圖標靜音/取消靜音
        volumeIcon.addEventListener('click', () => {
            const isMuted = volumeSlider.parentElement.classList.contains('muted');
            if (isMuted) {
                // 恢復到上次的音量
                const lastVolume = parseFloat(volumeSlider.getAttribute('data-last-volume') || 1);
                volumeSlider.value = lastVolume * 100;
                volumeSlider.dispatchEvent(new Event('input'));
            } else {
                // 儲存當前音量並靜音
                volumeSlider.setAttribute('data-last-volume', volumeSlider.value / 100);
                volumeSlider.value = 0;
                volumeSlider.dispatchEvent(new Event('input'));
            }
        });

        // 進度條控制
        document.getElementById('progressBar').addEventListener('input', (e) => {
            if (this.audio) {
                this.audio.currentTime = (e.target.value / 100) * this.audio.duration;
            }
        });

        // 均衡器控制
        document.querySelectorAll('.eq-slider').forEach((slider, index) => {
            slider.addEventListener('input', (e) => {
                this.equalizer[index].gain.value = e.target.value;
            });
        });
    }

    handleFileSelect(event) {
        const files = Array.from(event.target.files);
        this.playlist = files;
        this.updatePlaylist();
        if (files.length > 0) {
            this.currentTrackIndex = 0;
            this.loadAndPlay(files[0]);
        }
    }

    updatePlaylist() {
        const container = document.getElementById('playlist-container');
        container.innerHTML = '';
        this.playlist.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            li.onclick = () => {
                this.currentTrackIndex = index;
                this.loadAndPlay(file);
            };
            if (index === this.currentTrackIndex) {
                li.classList.add('active');
            }
            container.appendChild(li);
        });
    }

    async loadAndPlay(file) {
        if (this.audio) {
            this.audio.pause();
            this.audioSource?.disconnect();
        }

        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

        this.audio = new Audio(URL.createObjectURL(file));
        this.audioSource = this.audioContext.createMediaElementSource(this.audio);
        this.audioSource.connect(this.gainNode);

        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.playNext());

        this.updatePlaylist();
        this.play();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        if (this.audio) {
            this.audioContext.resume();
            this.audio.play();
            this.isPlaying = true;
            document.getElementById('playBtn').textContent = '暫停';
            this.startVisualization();
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            document.getElementById('playBtn').textContent = '播放';
            this.stopVisualization();
        }
    }

    playPrevious() {
        if (this.playlist.length > 0) {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
            this.loadAndPlay(this.playlist[this.currentTrackIndex]);
        }
    }

    playNext() {
        if (this.playlist.length > 0) {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
            this.loadAndPlay(this.playlist[this.currentTrackIndex]);
        }
    }

    fadeVolume(targetVolume, duration = 0.1) {
        const startVolume = this.gainNode.gain.value;
        const volumeChange = targetVolume - startVolume;
        const startTime = this.audioContext.currentTime;
        
        this.gainNode.gain.cancelScheduledValues(startTime);
        this.gainNode.gain.setValueAtTime(startVolume, startTime);
        this.gainNode.gain.linearRampToValueAtTime(targetVolume, startTime + duration);
    }

    updateProgress() {
        const currentTime = document.getElementById('currentTime');
        const duration = document.getElementById('duration');
        const progressBar = document.getElementById('progressBar');

        currentTime.textContent = this.formatTime(this.audio.currentTime);
        duration.textContent = this.formatTime(this.audio.duration);
        progressBar.value = (this.audio.currentTime / this.audio.duration) * 100;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    startVisualization() {
        const draw = () => {
            this.animationFrameId = requestAnimationFrame(draw);
            this.analyser.getByteTimeDomainData(this.dataArray);

            this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = '#4a90e2';
            this.canvasCtx.beginPath();

            const sliceWidth = this.canvas.width / this.bufferLength;
            let x = 0;

            for (let i = 0; i < this.bufferLength; i++) {
                const v = this.dataArray[i] / 128.0;
                const y = v * this.canvas.height / 2;

                if (i === 0) {
                    this.canvasCtx.moveTo(x, y);
                } else {
                    this.canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
            this.canvasCtx.stroke();
        };

        draw();
    }

    stopVisualization() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

// 當頁面加載完成時初始化播放器
window.addEventListener('DOMContentLoaded', () => {
    window.player = new AdvancedMusicPlayer();
});
