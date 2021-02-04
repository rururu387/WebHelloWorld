let sideBar;

function init()
{
    sideBar = new SideBar(document.getElementById("sidebar"), SidebarStates.Closed);
    document.getElementById("sidebarCell").classList.add("sidebarClosed");

    repeatableAnim();
}

function repeatableAnim()
{
    prepareBBAnim();
    prepareGooseClipAnim();
    muzzleFlashAnim();
    setTimeout(() => {shake(document.getElementById('gooseFiresAGun'))}, 20);

    setTimeout(() => { repeatableAnim(); }, 1000);
}

let shake = function (element, magnitude = 16, angular = false) 
{
    let shakingElements = [];
    //First set the initial tilt angle to the right (+1) 
    let tiltAngle = 1;
  
    //A counter to count the number of shakes
    let counter = 1;
  
    //The total number of shakes (there will be 1 shake per frame)
    let numberOfShakes = 15;
  
    //Capture the element's position and angle so you can
    //restore them after the shaking has finished
    let startX = 0,
        startY = 0,
        startAngle = 0;
  
    // Divide the magnitude into 10 units so that you can 
    // reduce the amount of shake by 10 percent each frame
    let magnitudeUnit = magnitude / numberOfShakes;
  
    //The `randomInt` helper function
    let randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    //Add the element to the `shakingElements` array if it
    //isn't already there
    if(shakingElements.indexOf(element) === -1) 
    {
      //console.log("added")
      shakingElements.push(element);
  
      //Add an `updateShake` method to the element.
      //The `updateShake` method will be called each frame
      //in the game loop. The shake effect type can be either
      //up and down (x/y shaking) or angular (rotational shaking).
      if(angular) 
      {
        angularShake();
      } else 
      {
        upAndDownShake();
      }
    }
  
    //The `upAndDownShake` function
    function upAndDownShake()
    {
  
      //Shake the element while the `counter` is less than 
      //the `numberOfShakes`
      if (counter < numberOfShakes) 
      {
  
        //Reset the element's position at the start of each shake
        element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
  
        //Reduce the magnitude
        magnitude -= magnitudeUnit;
  
        //Randomly change the element's position
        let randomX = randomInt(-magnitude, magnitude);
        let randomY = randomInt(-magnitude, magnitude);
  
        element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
  
        //Add 1 to the counter
        counter += 1;
  
        requestAnimationFrame(upAndDownShake);
      }
  
      //When the shaking is finished, restore the element to its original 
      //position and remove it from the `shakingElements` array
      if (counter >= numberOfShakes) 
      {
        element.style.transform = 'translate(' + startX + ', ' + startY + ')';
        shakingElements.splice(shakingElements.indexOf(element), 1);
      }
    }
  
    //The `angularShake` function
    function angularShake() 
    {
      if (counter < numberOfShakes) 
      {
        console.log(tiltAngle);
        //Reset the element's rotation
        element.style.transform = 'rotate(' + startAngle + 'deg)';
  
        //Reduce the magnitude
        magnitude -= magnitudeUnit;
  
        //Rotate the element left or right, depending on the direction,
        //by an amount in radians that matches the magnitude
        let angle = Number(magnitude * tiltAngle).toFixed(2);
        console.log(angle);
        element.style.transform = 'rotate(' + angle + 'deg)';
        counter += 1;
  
        //Reverse the tilt angle so that the element is tilted
        //in the opposite direction for the next shake
        tiltAngle *= -1;
  
        requestAnimationFrame(angularShake);
      }
  
      //When the shaking is finished, reset the element's angle and
      //remove it from the `shakingElements` array
      if (counter >= numberOfShakes) 
      {
        element.style.transform = 'rotate(' + startAngle + 'deg)';
        shakingElements.splice(shakingElements.indexOf(element), 1);
        //console.log("removed")
      }
    }
  
};

function muzzleFlashAnim()
{
    handgunGoose = document.getElementById('gooseFiresAGun');
    muzzleFlash = document.getElementById('muzzleFlash');
    muzzleFlash.style.position = 'absolute';
    muzzleFlash.style.left = parseInt(handgunGoose.offsetLeft, 10) + 'px';
    muzzleFlash.style.top = parseInt(handgunGoose.offsetTop, 10) + 'px';
    muzzleFlash.style.visibility = 'visible';
    setTimeout(() => {muzzleFlash.style.visibility = 'hidden';}, 300)
}

function prepareGooseClipAnim()
{
    let left = 0, topCoord = 0;
    gooseKatysha = document.getElementById('gooseKatysha');
    gooseClipElement = document.getElementById('gooseClip');
    gooseClipElement.style.position = 'absolute';
    gooseClipElement.style.top = (parseInt(gooseKatysha.offsetTop, 10) + 0.12 * parseInt(gooseKatysha.height, 10) ^ 2 / parseInt(gooseKatysha.naturalHeight, 10)) + 'px';
    gooseClipElement.style.left = (parseInt(gooseKatysha.offsetLeft, 10) + 0.359 * parseInt(gooseKatysha.width, 10) ^ 2 / parseInt(gooseKatysha.naturalWidth, 10)) + 'px';
    gooseClipElement.style.height = gooseClipElement.naturalHeight * parseInt(gooseKatysha.height, 10) / parseInt(gooseKatysha.naturalHeight, 10)
    gooseClipElement.style.width = gooseClipElement.naturalWidth * parseInt(gooseKatysha.width, 10) / parseInt(gooseKatysha.naturalWidth, 10)
    gooseClipElement.style.visibility = 'hidden';
    setTimeout(() => {  moveImageStraight(gooseClipElement, left, topCoord, -5, -3, 200, 5); }, 1000);
}

function prepareBBAnim()
{
    let left = 0, topCoord = 0;
    assaultGoose = document.getElementById('assaultGoose');
    assaultGoose.style.border = '5px solid #' + Math.floor(Math.random() * 16777215).toString(16);
    bbElement = document.getElementById('bb');
    bbElement.style.position = 'absolute';
    bbElement.style.top = (parseInt(assaultGoose.offsetTop, 10) + 0.47 * parseInt(assaultGoose.height, 10) ^ 2 / parseInt(assaultGoose.naturalHeight, 10)) + 'px';
    bbElement.style.left = (parseInt(assaultGoose.offsetLeft, 10) + parseInt(assaultGoose.width, 10) ^ 2 / parseInt(assaultGoose.naturalWidth, 10)) + 'px';
    bbElement.style.height = bbElement.naturalHeight * parseInt(assaultGoose.height, 10) / parseInt(assaultGoose.naturalHeight, 10)
    bbElement.style.width = bbElement.naturalWidth * parseInt(assaultGoose.width, 10) / parseInt(assaultGoose.naturalWidth, 10)
    bbElement.style.visibility = 'hidden';
    setTimeout(() => {  moveImageStraight(bbElement, left, topCoord, 4, -2, 30, 10, 0, callBBFall); }, 1000);
}

function callBBFall(bbElement, left, topCoord)
{
    moveImageStraight(bbElement, left, topCoord, -1, 4, 40, 10, 0, function(element, left, top){bbElement.style.visibility = "hidden";});
}

function moveImageStraight(imgObj, left, topCoord, xVelocity, yVelocity, iterationAm, updateDelay, iterationCnt = 0, callback = null)
{
    left = parseInt(imgObj.style.left, 10);
    topCoord = parseInt(imgObj.style.top, 10);

    let animate = null;

    if (iterationCnt <= iterationAm) 
    {
        imgObj.style.left = (left + xVelocity) + 'px';
        imgObj.style.top = (topCoord + yVelocity) + 'px';
        imgObj.style.visibility = 'visible';

        animate = setTimeout(function(){moveImageStraight(imgObj, left, topCoord, xVelocity, yVelocity, iterationAm, updateDelay, iterationCnt + 1, callback);}, updateDelay); // call moveRight in 20msec
    } else
    {
        stop(animate);
        if (callback != null)
            callback(bbElement, left, topCoord);
    }
}

function stop(animate)
{
   clearTimeout(animate);
}

const sticky = navbar.getBoundingClientRect().top + document.documentElement.scrollTop;
let wasSideBarScrollable = true;

function onScroll()
{
    console.log(window.pageYOffset + "\t" + sticky + "\t" + sideBar.getSideBar().style.marginTop)
    let navbar = document.getElementById("navbar");
    let sidebar = document.getElementById("sidebar");
    let sidebarCell = document.getElementById("sidebarCell");
    let cellBlock = document.getElementById("cellBlock");

    if (window.pageYOffset >= sticky && !navbar.classList.contains("sticky")) 
    {
        navbar.classList.add("sticky");
        cellBlock.style.marginTop = 0 + "px";
        if (sidebarCell.classList.contains("sidebarOpened"))
        {
            //cellBlock.style.position = "sticky";
            cellBlock.classList.add("sticky");
        }
    }
    else if (window.pageYOffset < sticky && navbar.classList.contains("sticky"))
    {
        navbar.classList.remove("sticky");
        cellBlock.style.marginTop = sticky + "px";
        if (sidebarCell.classList.contains("sidebarOpened"))
        {
            //cellBlock.style.position = "static";
            cellBlock.classList.remove("sticky");
        }
    }
}


const SidebarStates = Object.freeze({"Closed":1, "Opened":2});

class SideBar
{
    constructor(sidebar, state)
    {
        this.sidebar = sidebar;
        this.state = state;
    }

    getSideBar()
    {
        return this.sidebar;
    }

    expand()
    {
        let pageContentsCell = document.getElementById("pageContentsCell");
        let sidebarCell = document.getElementById("sidebarCell");
        let cellBlock = document.getElementById("cellBlock");
        
        if (window.pageYOffset < sticky)
        {
            cellBlock.style.marginTop = sticky + "px";
        }
        else
        {
            cellBlock.classList.add("sticky");
        }

        sidebarCell.classList.remove("sidebarClosed");
        sidebarCell.classList.add("sidebarOpened");
        this.state = SidebarStates.Opened;
    }

    collapse()
    {
        let pageContentsCell = document.getElementById("pageContentsCell");
        let sidebarCell = document.getElementById("sidebarCell");
        let cellBlock = document.getElementById("cellBlock");
        cellBlock.classList.remove("sticky");
        sidebarCell.classList.remove("sidebarOpened");
        sidebarCell.classList.add("sidebarClosed");
        this.state = SidebarStates.Closed;
    }

    toggleState()
    {
        switch(this.state)
        {
            case SidebarStates.Closed:
            {
                this.expand();
                break;
            }
            case SidebarStates.Opened:
            {
                this.collapse();
                break;
            }
            default:
            {
                window.stop();
                throw 'Sidebar state invalid';
            }
        }
    }
}

window.onload = function() {init();};

window.onscroll = function() {onScroll();};

document.getElementById("smilingGoose").onclick = function()
{
    sideBar.toggleState();
}