# dontlook

#Structure of project:

/pomo
  -main.html
  -style.css
  -script.js

  -pomo.html
  -pomo.css
  -pomo.js

-manifestpomo.json
-sw.js
-icon-192.png
-icon-512.png
-pomodorosound.mp3


##Used API's

  1. The Cat API
    -Endpoint:
       https://api.thecatapi.com/v1/images/search
     
  Usecase:
    After clicking the "Finish!" button we fetch() the photo.
    After finishing a task, user gets a reward which is a picture of a cat.
    We also save the ID's of each picture to local storage to not get duplicate cats.

##Local storage
  1.localStorage.setItem() = saving tasks and grid
  2.localStorage.getItem() = loading data
  3.caches.open() = cache for offline mode 
  4.cache.addAll = saving files to cache

##How it works...i yes
  ###tasks
  1. User enters in the name of task, their deadline and in how much they'll asign themselves to it.
  2. Task saves to localStorage()
  3. After finishing they get a pic of a cat.

  ###monthly grid
  1. Grid shows days of the month.
  2. When we finish a task one cube lights up for the current day in the grid.
  3. We can change the color of the grid or delete it in the settings panel.

  ###pomodoro timer
  1. On a different page, there's a very simple pomodoro timer.
  2. User sets their time, is able to pause or reset.
  3. At the end of the session there's sound feedback of the session ending.

  ###PWA
  1. manifestpomo.json
     -name of app
     -icons
     -colors
     -starting page
     -sw.js saves everything in cache
     -Can be downloaded on PC and Android, works offline.

  ##Diagram

                  -USER
                    |
                    |
        -add task      -start timer      
            |                     |
            |                    countdown
        -save to local           
            |                    
        -show cat

  ##Why?
    - I just wanted a simple pomodoro timer, so it could help others.
    - You can track your tasks and long term progress..hopefully
    - And who doesn't like cats!?
    - It's meant to be simple and hopefully useful.

  








  
