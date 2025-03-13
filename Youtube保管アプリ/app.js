const app = Vue.createApp({
    data() {
        return {
            searchQuery: "", // 検索ワード
            videos: [], // 検索結果の動画リスト
            savedVideos: JSON.parse(localStorage.getItem("savedVideos")) || [] // 保存済みの動画を取得
        };
    },
    methods: {
        async searchVideos() {
            const API_KEY = "YOUR_YOUTUBE_API_KEY"; // YouTube APIキーを設定
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(this.searchQuery)}&maxResults=6&key=${API_KEY}`;

            try {
                const response = await axios.get(url);
                this.videos = response.data.items;
            } catch (error) {
                console.error("検索に失敗しました:", error);
            }
        },
        saveVideo(video) {
            if (!this.savedVideos.find(v => v.id.videoId === video.id.videoId)) {
                this.savedVideos.push(video);
                this.updateLocalStorage();
            }
        },
        removeVideo(video) {
            this.savedVideos = this.savedVideos.filter(v => v.id.videoId !== video.id.videoId);
            this.updateLocalStorage();
        },
        updateLocalStorage() {
            localStorage.setItem("savedVideos", JSON.stringify(this.savedVideos));
        }
    }
});

app.mount("#app");
