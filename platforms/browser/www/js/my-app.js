// Initialize your app
var myApp = new Framework7({
	swipePanel: 'left',
	swipeBackPage: false,
});

// Export selectors engine
var $$ = Dom7;


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
$$(document).on('pageInit', function (e) {
	$(".swipebox").swipebox();
	$(".videocontainer").fitVids();
	var i = 0;
	$("#loadmore").click(function(){
		i++;
		if(i<5) {
			var html = '';
			html += '<div class="card post-card"><div class="card-header"><div class="post-avatar"><img src="images/photos/avatar.jpg" width="34" height="34"></div><div class="post-name">John Doe</div><div class="post-date">Monday at 2:15 PM</div></div><div class="card-content"><div class="card-content-inner"><h4 class="title-post"><a href="single.html">The eye should learn to listen before it looks.</a></h4><img src="images/photos/5.jpg" width="100%" class="img"><p>What a nice photo i took yesterday! Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin et augue nec ex facilisis pulvinar.</p><p class="color-gray infos">Likes: 112  -  Comments: 43</p></div></div><div class="card-footer no-border"><a href="#" class="link">Like</a><a href="#" class="link">Comment</a><a href="#" class="link">Share</a></div></div>';
			$('#blog-page').append(html);
			
		}else{
			$("#loadmore").hide();
		}
	});


	$(".pdf").click(function(event) {
		
		openViewer('01/a.pdf');
	});
});
var x;
document.addEventListener('deviceready', function () {
    // cordova.plugins.SitewaertsDocumentViewer is now available
    x = cordova.plugins.SitewaertsDocumentViewer;
    alert(x);
}, false);

var openViewer = function (url) {
    SitewaertsDocumentViewer.viewDocument(
        url,
        'application/pdf',
        {},
        function () {
            // shown
            //window.console.log('document shown');
        },
        function () {
            // closed
            //window.console.log('document closed');
        },
        function (appId, installer) {
            // missing app
            if (confirm("Do you want to install the free PDF Viewer App "
                    + appId + " for Android?")) {
                installer(
                    function () {
                        //window.console.log('successfully installed app');
                        if (confirm("App installed. Do you want to view the document now?"))
                            viewDocument(url, mimeType, storage);
                    },
                    function (error) {
                        //window.console.log('cannot install app');
                        //window.console.log(error);
                    }
                );
            }
        },
        function (error) {
            alert(getString("error_pdfreader_notfound"));
            //window.console.log('cannot view document ');
            //window.console.log(error);
        }
    );
};
