const showInfo = () => {
    let y = 0;
    const profileButton = document.querySelector("#profile-button");
    const webButton = document.querySelector("#web-button");
    const emailButton = document.querySelector("#email-button");
    const locationButton = document.querySelector("#location-button");
    const text = document.querySelector("#text");

    
    profileButton.setAttribute("visible", true);
    setTimeout(() => {
    
    webButton.setAttribute("visible", true);
    }, 300);

    setTimeout(() => {
    
    emailButton.setAttribute("visible", true);
    }, 600);

    setTimeout(() => {
    
    locationButton.setAttribute("visible", true);
    }, 900);

    
    let currentTab = '';
    webButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "http://www.hnweidagroup.com/");
   
      currentTab = 'web';
    });
    emailButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "hnweida@126.com");
      currentTab = 'email';
    });
    profileButton.addEventListener('click', function (evt) {
      text.setAttribute("value", "0371-60273000");
      currentTab = 'profile';
    });
    locationButton.addEventListener('click', function (evt) {
      console.log("loc");
      text.setAttribute("value", "CHINA.Zhengzhou")                                                                                                                                                                                                                          
      currentTab = 'location';
    });

    text.addEventListener('click', function (evt) {
      if (currentTab === 'web') {
        window.location.href = "http://www.hnweidagroup.com/";
      }
      // else if(currentTab === 'profile'){
      //   window.location.href="0371-60273000";
      // }

    }
    
    );

    
  }

  const showPortfolio = (done) => {
    const portfolio = document.querySelector("#portfolio-panel");
    const portfolioLeftButton = document.querySelector("#portfolio-left-button");
    const portfolioRightButton = document.querySelector("#portfolio-right-button");
    const paintandquestPreviewButton = document.querySelector("#paintandquest-preview-button");

    let y = 0;
    let currentItem = 0;

    portfolio.setAttribute("visible", true);

    const showPortfolioItem = (item) => {
      for (let i = 0; i <= 4; i++) {
        document.querySelector("#portfolio-item" + i).setAttribute("visible", i === item);
      }
    }
    const id = setInterval(() => {
      y += 0.008;
      if (y >= 0.6) {
        clearInterval(id);
        //左按钮
        portfolioLeftButton.setAttribute("visible", true);
        //右按钮
        portfolioRightButton.setAttribute("visible", true);
        
        //左按钮加监听， 
        portfolioLeftButton.addEventListener('click', () => {
          currentItem = (currentItem + 1) % 5;
          showPortfolioItem(currentItem);
        });
        //右按钮加监听
        portfolioRightButton.addEventListener('click', () => {
          currentItem = (currentItem - 1 + 5) % 5;
          showPortfolioItem(currentItem);
        });

        //按钮大图
        paintandquestPreviewButton.addEventListener('click', () => {
         //点击后消失
          paintandquestPreviewButton.setAttribute("visible", false);
          
          const testVideo = document.createElement("video");
          const canplayWebm = testVideo.canPlayType('video; codecs="vp8, vorbis"');
          if (canplayWebm == "") {
            document.querySelector("#paintandquest-video-link").setAttribute("src", "#paintandquest-video-mp4");
            document.querySelector("#paintandquest-video-mp4").play();
          } 
        });


        setTimeout(() => {
          done();
        }, 500);
      }
      portfolio.setAttribute("position", "0 " + y + " -0.01");
    }, 10);
  }

  const showAvatar = (onDone) => {
    const avatar = document.querySelector("#avatar");
    let z = -0.3;
    const id = setInterval(() => {
      z += 0.008;
      if (z >= 0.3) {
        clearInterval(id);
        onDone();
      }
      avatar.setAttribute("position", "0 -0.25 " + z);
    }, 10);
  }

  AFRAME.registerComponent('mytarget', {
    init: function () {
      this.el.addEventListener('targetFound', event => {
        console.log("target found");
        showAvatar(() => {
          setTimeout(() => {
            showPortfolio(() => {
              setTimeout(() => {
                showInfo();
              }, 300);
            });
          }, 300);
        });
      });
      this.el.addEventListener('targetLost', event => {
        console.log("target found");
      });
      //this.el.emit('targetFound');
    }
  });