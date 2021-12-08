        const $             =   document.querySelector.bind(document)
        const $$            =   document.querySelectorAll.bind(document)
        const heading       =   $('header h2')
        const cdThumb       =   $('.cd-thumb')
        const audio         =   $('#audio')
        const cd            =   $('.cd')
        const player        =   $('.player')
        const playBtn       =   $('.btn-toggle-play')
        const progress      =   $('#progress')
        const nextBtn       =   $('.btn-next')
        const prevBtn       =   $('.btn-prev')
        const randomBtn     =   $('.btn-random')
        const repeatBtn     =   $('.btn-repeat')
        const title         =   $('title')
        const playlist      =   $('.playlist')

        const app = {
            currentIndex: 0,
            isPlaying: false,
            isRandom:false,
            isRepeat: false,
            songs: [               
              {
                name: "Ái Nộ",
                singer: "Masew x KhoiVu",
                path: "./accset/audio/AiNo1-MasewKhoiVu-7078913.mp3",
                image: "https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/6/b/1/c/6b1c9deca228d456e63e1c9c0bfd1c28.jpg"
              },
              {
                name: "Ngược Chiều Yêu Thương",
                singer: "Dương-Edward x Vũ Duy Khánh",
                path: "./accset/audio/Nguoc-Chieu-Yeu-Thuong-Duong-Edward-Vu-Duy-Khanh.mp3",
                image:"https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/2/a/b/2/2ab28f8bed3662f9a9788686f0cba8f5.jpg"
              },            
              {
                name: "Giọt Nắng Bên Thềm",
                singer: "Dương Edward ",
                path: "./accset/audio/Giot-Nang-Ben-Them-Duong-Edward.mp3",
                image:"https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
              },             
              {
                name: "Anh Sai Rồi",
                singer: "Sơn Tùng MTP",
                path: "./accset/audio/Anh-Sai-Roi-Son-Tung-M-TP.mp3",
                image:"https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/avatars/e/e/ee58fcc0ff45002b8d416bd7685809ce_1487040461.jpg"
              },             
              {
                name: "Kém Duyên",
                singer: "Rum,NIT,Masew",
                path: "./accset/audio/Kem-Duyen-Rum-NIT-Masew.mp3",
                image:"https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
              },             
              {
                name: "Đi Để Trở Về",
                singer: "Soobin Hoàng Sơn",
                path: "./accset/audio/Di-De-Tro-Ve-SOOBIN.mp3",
                image:"https://photo-resize-zmp3.zadn.vn/w94_r1x1_png/covers/1/e/1ebc5f3387b2179e25e55d6208b16b04_1500952255.png"
              },             
              {
                name: "Bức Tranh Từ Nước Mắt",
                singer: "Mr.Siro",
                path: "./accset/audio/Buc-Tranh-Tu-Nuoc-Mat-Mr-Siro.mp3",
                image:"https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/avatars/7/1/71e884a8168fa5a3a8c596dca8d30193_1473737667.jpg"
              },             
              {
                name: "Váy Cưới",
                singer: "Trung Tự",
                path: "./accset/audio/VayCuoi-TrungTu.mp3",
                image:"https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/d/f/d/c/dfdc847c99d1f7b549d01528188aa1ed.jpg"
              },
              {             
                name: "Cố Giang Tình",
                singer: "X2X",
                path: "./accset/audio/CoGiangTinh-X2X.mp3",
                image:"https://photo-resize-zmp3.zadn.vn/w94_r1x1_webp/cover/4/9/d/a/49da6a1d6cf13a42e77bc3a945d9dd6b.jpg"
              
              }             
              ],
            render: function(){
                const htmls = this.songs.map((song,index) => {
                    return `
                    <div class="song ${index===this.currentIndex ? 'active':''}" data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                    `
                })
                playlist.innerHTML = htmls.join("")

            },   
            defineProperties: function(){
                Object.defineProperty(this,'currentSong',{
                    get: function(){
                        return this.songs[this.currentIndex]
                    }
                })
            }, 
            handleEvents: function () {    
                const _this = this           
                const cdWidth=cd.offsetWidth

                //xu ly CD quay/ dung

                const cdThumbAnimate = cdThumb.animate([{transform:"rotate(360deg)"}], {
                  duration: 10000, // 10 seconds
                  iterations: Infinity
                });
                cdThumbAnimate.pause();
              
                //xu ly phong to thu nho
                document.onscroll = function () {                    
                    const scrollTop= window.scrollY || document.documentElement.scrollTop
                    const newCdWidth =  cdWidth - scrollTop                  
                    cd.style.width = newCdWidth > 0 ? newCdWidth + "px" :0 
                    cd.style.opacity = newCdWidth / cdWidth
                };

                playBtn.onclick = function () {
                    if (_this.isPlaying) {
                      audio.pause();
                    } else {
                      audio.play();
                    }
                  };
              
                  // Khi song được play
                  // When the song is played
                  audio.onplay = function () {
                    _this.isPlaying = true;
                    player.classList.add("playing");
                    cdThumbAnimate.play();
                  };
              
                  // Khi song bị pause
                  // When the song is pause
                  audio.onpause = function () {
                    _this.isPlaying = false;
                    player.classList.remove("playing");
                    cdThumbAnimate.pause();
                  };
                  //Khi tien do bai hat thay doi
                  audio.ontimeupdate = function () {
                    if(audio.duration){
                      const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                      progress.value= progressPercent
                     
                    }
                  };
                  // Xu li khi tua Song
                  progress.onchange = function (e) {
                    const seekTime = audio.duration / 100 *e.target.value
                    audio.currentTime = seekTime
                  };
                  // Khi next bai song
                  nextBtn.onclick= function (){
                    if(_this.isRandom){
                      _this.playRandomSong()
                    }
                    else{
                      _this.nextSong()
                    }
                    audio.play()
                    _this.render()
                    _this.scrollToActiveSong()
                  };
                  //Khi prev bai song
                  prevBtn.onclick = function () {
                    if(_this.isRandom){
                      _this.playRandomSong()
                    }
                    else{
                      _this.prevSong()

                    }
                    audio.play()
                    _this.render()
                  };
                  // Khi bấm ngẫu nhiên
                  randomBtn.onclick = function (e) {
                    _this.isRandom = !_this.isRandom
                    randomBtn.classList.toggle('active',_this.isRandom)
                   
                  };
                  repeatBtn.onclick = function(e){
                    _this.repeat = !_this.isRepeat
                    repeatBtn.classList.toggle('active',_this.isRepeat)
                  };

                  audio.onended = function () {
                    if(_this.isRepeat){
                      audio.play()
                    }
                    else{
                      nextBtn.click();

                    }
                  };
                  // Lắng nghe hành vi click vào playlist
                  playlist.onclick= function (e){
                    const songNode = e.target.closest('.song:not(.active)') 
                    if(songNode|| !e.target.closest('.option')){
                      //Xử lý khi click vào Song
                      if(e.target.closest('.song:not(.active)')){
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        audio.play()
                        _this.render()
                      }
                      //Xử lý khi click vào option
                      if(e.target.closest('.option')){

                      }
                    }
                  };
            },  

            loadCurrentSong: function() {  
                // title.textContent=this.currentSong.name
                heading.textContent =this.currentSong.name
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
                audio.src = this.currentSong.path  
                  
            },
            nextSong: function() {
              this.currentIndex++
              if(this.currentIndex>=this.songs.length){
                this.currentIndex = 0
              }
              this.loadCurrentSong()
            },
            prevSong: function() {
                this.currentIndex--
                if(this.currentIndex<0){
                  this.currentIndex = this.songs.length-1
                }
                this.loadCurrentSong()
            },
            playRandomSong: function() {
              let newindex
              do{
                newindex = Math.floor(Math.random()* this.songs.length)
              }while(newindex === this.currentIndex)
              this.currentIndex= newindex
              this.loadCurrentSong()
            },
            scrollToActiveSong: function() {
              setTimeout(()=>{
                $('.song.active').scrollIntoView({
                  behavior: 'smooth',
                  block:'center'
                })
              },300)
            },
            start:function () {
                //Định Nghĩa Thuộc Tính Cho object
                this.defineProperties();

                //Lắng Nghe Xử Lý Sự Kiện
                this.handleEvents();

                //Tải thông tin bài hát đầu tiên vào UI khi chạy                
                this.loadCurrentSong();

                // render playlist
                this.render();
            }
        
        }
        app.start();