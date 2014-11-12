$(document).ready(function() {
	// OSの取得
	var ua = navigator.userAgent;
	var os = "";
	if(ua.indexOf("iPod") > 0 || ua.indexOf("iPhone") > 0　|| ua.indexOf("iPad") > 0){
		os = "iOS";
	} else if (ua.indexOf("Android") > 0){
		os = "Android"
	}

	// テキストリア
	//$(".message_box").autosize();

    // バナー
    if(!$(".banner") == undefined){
		$(".banner").slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: false,
			dots: false,
			easing: true
		});
	}

	/*
	$(".banner").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: false,
		easing: true,
		speed: 2000
	});
	*/

	// アプリ画像
	if(!$(".app_imgs") == undefined){
		$(".app_imgs").slick({
			infinite: false,
			slidesToShow: 1.86,
			slidesToScroll: 2,
			autoplay: false,
			arrows: false,
			dots: false,
			adaptiveHeight: true,
			touchThreshold: 20
		});
	}
	
	// タブ
	if(os !==''){
		$(".tab li").click(function(){
			var num = $(".tab li").index(this);
			$(".wrapper").addClass("disnon");
			$(".wrapper").eq(num).removeClass("disnon");
			$(".tab li").removeClass("select");
			$(".tab li").addClass("deselect");
			$(this).addClass("select");
			$(this).removeClass("deselect");
		});
	}
	
	// レート
	$(".app_star").raty({
		halfShow     : true,
		half     	 : true,
		readOnly     : true,
		starHalf     : 'lib/raty-2.7.0/lib/images/star-half.png',
   		starOff      : 'lib/raty-2.7.0/lib/images/star-off.png',
    	starOn       : 'lib/raty-2.7.0/lib/images/star-on.png',
  		score: function() {
    		return $(this).attr('data-score');
  		}
	});

	// レート レビュー
	$("#review_form .app_star").raty({
		halfShow     : true,
		half     	 : true,
		readOnly     : false,
		starHalf     : 'lib/raty-2.7.0/lib/images/star-half.png',
   		starOff      : 'lib/raty-2.7.0/lib/images/star-off.png',
    	starOn       : 'lib/raty-2.7.0/lib/images/star-on.png',
    	scoreName    : function(){
        	return $(this).attr('id');
        },
  		score: function() {
    		return $(this).attr('data-score');
    	}
  	});

	// イイネ
	$(".action_like").click(function(){
		$(this).attr({src : "img/btn_like.png"});
		return false;
	});

	// フィードバック表示
	$(".comment").click(function(){
		var comment = $(this);
		var id = $(this).attr("comment_id");
		$.ajax({
				type: "GET",
				scriptCharset: 'utf-8',
				dataType:'json',
				url: id + "/feedbacks/get",
			}).done(function(data) {
				var count = Object.keys(data).length; //フィードバック数	
				for(var i = 0 ; i < count ; i++){
					var json = data[i];
					var html = '<div class = "feedback"><p><span class = "feedback_title">' + json.title + '</span><br />' + json.reviewer.username + ' - ' + formatDate(json.created_at) + '</p>' + json.message + '</div>';
					comment.append(html);
					comment.children(".feedback").slideDown();					
				}
				comment.off();
			});
	});

	// レビューを書く
	$(".btn_write_review").click(function(){
		if(isShowingModal == false){
			hideOtherButtonsAndShowModal();
			showReviewModalDialog();
			var title = "";
			var message = "";
			var id = "";
			var feedback_id = "";
			title = $(this).attr("name");
			id = $(this).attr("app_id");
			feedback_id = $(this).attr("comment_id");
			if($(this).hasClass("action_feedback")){
				message = title + "のコメントにフィードバックしよう！";
				$(".modal_box form ul").hide();
			}else{
				message = title + "をプレイしてレビューしよう！";
				$(".modal_box form ul").show();
			}
			$(".message_box").attr({placeholder : message});
			$("#review_form").children(".modal_box").children("form").attr({ action : "/" + id + "/post/review"});
			$("#feedback_id").val(feedback_id);
		}
		return false;
	});

	// ヘッダ
	var isShowingModal = false;
	$(".list_category, .search_cancel").click(function(){
		if(isShowingModal == false){
			switch(state){
				case t_state.ONLY_BACK :
					history.back();
					break;
				case t_state.NORMAL : 
				default :
					$(".modal_sort").show();
					hideOtherButtonsAndShowModal();
					hideReviewModalDialog();
				break;
			}
		}else{
			switch(state){
				case t_state.ONLY_BACK :
					showOtherButtonsAndHideModal();
					$(".list_category").children("a").children("img").attr({ src : "img/icon_back.png"});
					break;
				case t_state.NORMAL : 
				default :
					showOtherButtonsAndHideModal();
					break;
			}
		}
	});

	$(".list_search").click(function(){
		if(isShowingModal == false){
			$(".modal_search").show();
			hideOtherButtonsAndShowModal();
			hideReviewModalDialog();
		}
	});

	$(".list_user").click(function(){
		if(isShowingModal == false){
			$(".modal_user").show();
			hideOtherButtonsAndShowModal();
			hideReviewModalDialog();
		}
	});

	function hideOtherButtonsAndShowModal(){
		isShowingModal = true;
		$("#modal_screen").slideDown();
		$(".list_category").children("a").children("img").attr({ src : "img/icon_back.png"});
		$(".list_search").css("visibility" , "hidden");
		$(".list_user").css("visibility" , "hidden");
	}

	function showOtherButtonsAndHideModal(){
		isShowingModal = false;
		$(".modal_sort").hide();
		$(".modal_search").hide();
		$(".modal_user").hide();
		$("#modal_screen").slideUp();
		$(".list_category").children("a").children("img").attr({ src : "img/icon_category.png"});
		$(".list_search").css("visibility" , "visible");
		$(".list_user").css("visibility" , "visible");
	}

	function showReviewModalDialog(){
		$("#review_form").show();
	}

	function hideReviewModalDialog(){
		$("#review_form").hide();
	}

	// 日付のフォーマット
	function formatDate(date){
		var temp = date.split(" ");
		temp = temp[0].split("-");
		date = temp[0] + "/" + temp[1] + "/" + temp[2];
		return date;
	} 
});

var t_state = {
		NORMAL : 0,
		ONLY_BACK : 1,
	}
var state = t_state.NORMAL;