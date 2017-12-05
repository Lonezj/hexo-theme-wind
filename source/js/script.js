$(function(){
    var activeItem = null;
    var toTop = document.getElementById("to-top");
    var scrollDistance = {y: 'undefined'}, scrollDirection;

    $("#to-top").hide();
    $(".catalog-dropdown").hide();
    $("a").focus(function(){this.blur()});

    //Show More Info in Index
    $(".index-post-wrapper").on("touchstart", postDetail);
    $(".index-post-wrapper").on("mouseenter", postDetail);
    $(".index-post-wrapper").on("mouseleave", postTitle);
    //Show Catalog
    $(".catalog-btn").on("click", toggleCatalog);
    $(".catalog-dropdown").on("click", function(e){
        e.stopPropagation();
    });
    //Back To Top
    $("a.toTop").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
    //Show or Hide Gallery Photo
    $(".gallery-thumbnail").on("click",showGalleryPhoto);
    //Show or Hide Article Lightbox
    $(".post-content img").on("click",showGalleryPhoto);
    $(".gallery-photo").on("click",function(e){
        e.stopPropagation();
    });
    $(".close-gallery").on("click",closeGallery);
    $(".lightbox").on("click",closeGallery);
    
    function postDetail(){
        if (activeItem != $(this)){
            postTitle.call(activeItem);
            activeItem = $(this);
        }
        $(this).children(".index-post-info").fadeTo(500,1);
        $(this).find(".index-post-title").css({"color":"rgb(26, 67, 121)"});
        $(this).find(".index-post-categories").children("a").css({"color":"rgb(26, 67, 121)"});
    }

    function postTitle(){
        $(this).children(".index-post-info").fadeTo(500,0);
        $(this).find(".index-post-title").css({"color":"rgb(77, 78, 82)"});
        $(this).find(".index-post-categories").children("a").css({"color":"rgb(77, 78, 82)"});
    }


    function toggleCatalog(e){
        if($(".catalog-dropdown").is(":hidden")){
            $(".catalog-dropdown").fadeIn();
        }else{
            $(".catalog-dropdown").fadeOut();
        }

        $(document).one("click", function(){
            $(".catalog-dropdown").fadeOut();
        });
        e.stopPropagation();
    }

    //Toggle 'To Top' Button State
    window.onscroll = function(e){
        checkScrollDirec();

        if(scrollDirection == 'down'){
            $("#to-top").animate({
                opacity: 'hide'
            }, {
                duration: 500,
                easing: "swing"
            });
        }
        else if(scrollDirection == 'up'){
            $("#to-top").animate({
                opacity: 'show'
            }, {
                duration: 500,
                easing: "swing"
            });
        }
    }
    
    function checkScrollDirec() {
        if (typeof scrollDistance.y == 'undefined') {
          scrollDistance.y = window.pageYOffset;
        }
        var diffY = scrollDistance.y - window.pageYOffset;
        if (diffY < 0) {
          scrollDirection = 'down';
        } else if (diffY > 0) {
          scrollDirection = 'up';
        } else {
        }
        scrollDistance.y = window.pageYOffset;
      }

    function showGalleryPhoto(){
        $(".lightbox").fadeIn(500);
        $(".lightbox").attr("style","display: flex");
        if($(this).attr("value"))
            //Gallery Photo
            $(".gallery-photo").attr("src",$(this).attr("value"));
        else
            //Article Photo
            $(".gallery-photo").attr("src",$(this).attr("src"));

        $('body').addClass("hideoverflow");
    }

    function closeGallery(){
        $(".lightbox").fadeOut(500);
        $('body').removeClass("hideoverflow");
    }
});