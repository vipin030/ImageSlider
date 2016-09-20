/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    /* First, validate the message's structure */
   	if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        /* Collect the necessary data */
         
        var images=document.querySelectorAll('img');
        var myArray=Array.prototype.slice.call(images);
        var i,k=0;
        var arr=new Array();
        for (i = 0; i < myArray.length; i++)
        {
            if(myArray[i].naturalWidth>=100 || myArray[i].naturalHeight>=100)
            {
                arr[k]=myArray[i].src;
                k++;
            }
        }

        var myJsonImgSrc = JSON.stringify(arr);  
       
        /* Directly respond to the sender (popup), 
         * through the specified callback */
        response(myJsonImgSrc);
         
        var currentUrl=document.location.href;
        
        chrome.runtime.sendMessage({
              from:    'content',
              subject: 'showPageAction',
              pageUrl : currentUrl,
              images  : myJsonImgSrc
        });

    }
});


//injecting the javascript code to the current page.       
var c =document.createElement('link');
c.href = chrome.extension.getURL('css/mystyle.css');
c.type = "text/css";
c.rel = "stylesheet";
(document.head || document.documentElement).appendChild(c);
          

    
