// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var winlove = Titanium.UI.createWindow({  
    title:'Love Calculator',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:winlove
});

var labelLove = Titanium.UI.createLabel({
	color:'black',
	text:'Love Calculator',
	font:{fontSize:'15dp',fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	top:'5%'
});

winlove.add(labelLove);

var yourname = Titanium.UI.createTextField({
	hintText:'Your Name',
	top:'10%',
	width:'90%',
});
winlove.add(yourname);
var crushName = Titanium.UI.createTextField({
	hintText:'Your Crush\'s Name',
	top:'25%',
	width:'90%',
});
winlove.add(crushName);
var calculate = Titanium.UI.createButton({
	title:'Calculate',
	top:'40%',
	width:'70%'
});
winlove.add(calculate);


calculate.addEventListener("click",function(e){
	var uname = yourname.value;
	var upass = crushName.value;
	var xhr=Titanium.Network.createHTTPClient();    
	xhr.onerror = function(e){ 
		Ti.API.error('Bad Sever =>'+e.error);
	};
	 
	xhr.open("POST","http://192.168.1.31/testing.php");//ADD your URL
	xhr.setRequestHeader("content-type", "application/json");
	var param={ "fname":uname,"sname":upass};
	 
	Ti.API.info('Params'+JSON.stringify(param));
	xhr.send(param);
	 
	xhr.onload = function(){
		Ti.API.info('RAW ='+this.responseText);
		alert(this.responseText);
		if(this.status == '200'){
			Ti.API.info('got my response, http status code ' + this.status);
			if(this.readyState == 4){
	  			var response=JSON.parse(this.responseText);
	  			Ti.API.info('Response = '+response);
			}else{
	  			alert('HTTP Ready State != 4');
	    	}           
	 		}else{
	    		alert('HTTp Error Response Status Code = '+this.status);
				Ti.API.error("Error =>"+this.response);
	 		}              
	};
});




/*
function getcount(word,letter)
	{
		var counter = 0;
		var word = word.split('');
		for (i=0;i<word.length;i++)
		{
			if (word[i] == letter)
				{
					counter++;
				}
		}	
		return counter;
	}
calculate.addEventListener("click",function(e){
	var fname = yourname.value;
	var sname = crushName.value;
	var fsname = fname + 'loves' +sname;
	for(i=0;i<fsname.length;i++)
	{
		var fsname1 = fsname.split('');
		alert(getcount(fsname,fsname1[i]));
	}
	//alert(getcount(fsname,'a'));
});
*/
winlove.open();
