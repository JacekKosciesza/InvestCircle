# InvestCircle

## Repository

Clone repository
`git clone https://github.com/JacekKosciesza/InvestCircle.git`

## Frontend

Update Angular CLI:

````
npm uninstall -g angular-cli
npm cache verify
npm install -g @angular/cli@latest
ng --version
```text


     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 7.1.4
Node: 11.10.0
OS: win32 x64
Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.11.4
@angular-devkit/core         7.1.4
@angular-devkit/schematics   7.1.4
@schematics/angular          7.1.4
@schematics/update           0.11.4
rxjs                         6.3.3
typescript                   3.1.6
````

Create initial Angular app

```
ng new InvestCircle --directory=./ --commit=false --routing=true --skipGit=true --style=scss
ng update
ng update @angular/cli
ng update @angular/core
```

```
git status
git add -A
git commit -m "Initial Angular app"
git status
git push