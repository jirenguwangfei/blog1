function Carousel($ct) {
    this.$ct = $ct
    this.$pre = this.$ct.find(".pre");
    this.$next = this.$ct.find(".next");
    this.$imgWidth = this.$ct.find(".imgWrap img").width();
    this.imgs = this.$ct.find(".imgWrap img");
    this.$imgWrap = this.$ct.find(".imgWrap");
    this.$count = this.$ct.find(".imgWrap img").length;
    this.pageIndex = 0;
    this.$pages = this.$ct.find(".pages span")
    this.isAnimate = false;
    this.init()
    this.timerId
}


Carousel.prototype.init = function() {
    let _this = this
    this.$imgWrap.append(this.imgs.first().clone())
    this.$imgWrap.prepend(this.imgs.last().clone())
    this.$imgWrap.css({
        left: -this.$imgWidth
    })
    this.$imgWrap.width(this.$imgWidth * (this.$count + 2));
    this.$pre.click(function(event) {
        console.log(1)
        _this.playPrePage(1);
    });
    this.$next.click(function(event) {
        console.log(2)
        _this.playNextPage(1)
    });
    this.$pages.click(function(event) {
        console.log(3)
        var $index = $(this).index();
        if (_this.pageIndex > $index) {
            _this.playPrePage(_this.pageIndex - $index)
        } else if (_this.pageIndex < $index) {
            _this.playNextPage($index - _this.pageIndex)
        }
    });
    this.start()
    this.pause()
};
Carousel.prototype.playPrePage = function(num) {
    console.log("num", num)
    let _this = this
    if (this.isAnimate) return;
    this.isAnimate = true;
    this.$imgWrap.animate({
            left: "+=" + _this.$imgWidth * num
        },
        500,
        function() {
            _this.pageIndex -= num;
            if (_this.pageIndex < 0) {
                _this.pageIndex = _this.$count - 1;
                _this.$imgWrap.css({
                    left: -_this.$imgWidth * (_this.$count)
                })
            }
            _this.setPagesActive(_this.pageIndex)
            _this.isAnimate = false;
        });
};
Carousel.prototype.playNextPage = function(num) {
    let _this = this
    if (_this.isAnimate) return;
    _this.isAnimate = true;
    _this.$imgWrap.animate({
            left: "-=" + _this.$imgWidth * num
        },
        500,
        function() {
            _this.pageIndex += num;
            if (_this.pageIndex > _this.$count - 1) {
                _this.pageIndex = 0;
                _this.$imgWrap.css({
                    left: -_this.$imgWidth
                })
            }
            _this.setPagesActive(_this.pageIndex)
            _this.isAnimate = false;
        });
};
Carousel.prototype.setPagesActive = function(num) {
    this.$pages.removeClass('active')
        .eq(num).addClass('active');
};
Carousel.prototype.start = function(){
    this.timerId = window.setInterval(() => {
        console.log(this.pageIndex)
        let n = 1
        this.playNextPage(n)
        n += 1
    }, 1000)
}
Carousel.prototype.pause = function(){
    this.$ct.on("mouseenter",(e)=>{
        console.log(this.timerId)
        window.clearInterval(this.timerId)
    })
    this.$ct.on("mouseleave",(e)=>{
        this.start()
    })
}

! function() {
    let $ct = $(".carousel")
    let carousel = new Carousel($ct)

}()

