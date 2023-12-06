# Ionic Hex Achitect Demo - TV Maze

## Pre requiements

To use the aplication on Mac these are the recomended tools to use

- homebrew [https://brew.sh/]

```bash
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Android Studio [https://developer.android.com/studio]

if you are using Hombrebrew you can install it by runing

```bash
brew install android-studio
```

- OpenJDK (Opcional) [https://openjdk.org/]
  Android studio comes with the latest version of Open JDK embeded but you need to configure in your enviroment, you can set it manually by setting your JAVA_HOME env to but this process is not recomended, you can set the java versions using jenv instead

```bash
 $JAVA_HOME = /Applications/Android\ Studio.app/Contents/jbr/Contents/Home
```

- jenv [https://www.jenv.be/]
  This tool let you setup multiple java instalations and easyly switch between then, to install it and setup java embed version use the following comands

```bash
brew install jenv
jenv add /Applications/Android\ Studio.app/Contents/jbr/Contents/Home
jenv versions
```

The last command will ouput the versions you have installed

```bash
  system
  1.8
  1.8.0.202
  11.0
  11.0.15
  11.0.19
  17.0.6
  openjdk64-11.0.15
  openjdk64-11.0.19
  oracle64-1.8.0.202
```

The java version embed in android studio is 17.0.6 and to set it as your default run the nex command

```bash
jenv global 17.0.6
```

- cocoapods [https://cocoapods.org/]
  This is required to build the IOS project

```bash
brew install cocoapods
```

- gradle [https://formulae.brew.sh/formula/gradle]
  This is required to build the android project (not allways since newers Android projects download it in the creation stage process)

```bash
brew install gradle
```

If you want to set homebrew gradle as default you need to add to your .zshrc file the next lines

```bash
export BREW_PATH=$(brew --prefix)
export GRADLE_HOME=$(brew info gradle | grep ${BREW_PATH}/Cellar/gradle | awk '{print $1}')
export PATH="$GRADLE_HOME:$PATH"
```

-nvm [https://formulae.brew.sh/formula/nvm]
This tool lets you use diferentess versions of NodeJs at the same time

```bash
brew update
brew install nvm
```

Afther installing you need to add the following to your .zshrc file

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
export NPM_PACKAGES="${HOME}/.npm"
```

Ather that we install the necesary node version, we will search it by the code name, in this case the LTS version compatible with our enviroment is called Hydrogen (LTS 18) and we install it with the following commands

```bash
nvm ls-remote --lts=Hydrogen
nvm install --lts=Hydrogen
nvm nvm use --lts=Hydrogen
nvm alias default --lts=Hydrogen
```

Ather that we can now setup our Ionic Angular enviroment as usual installing

- Angular cli, ionic cli, capacitor-cli, cordova-res, native-run

```bash
npm i -g @angular/cli @ionic/cli @capacitor/cli cordova-res native-run
```

## Desarrollo

- Para ejecutar el servidor de desarrollo

```bash
npm start
```

## Documentation

- Documentation was generated using [@compodoc/compodoc](https://github.com/compodoc/compodoc)
- To generate it you need to run the command

```bash
npm run compodoc:build
```

The documentation will be avaible in the [documentation folder](/documentation/)

## Architecture

- We use Ionic Framework as UI desin sysrtem to delivery a hybrid Web/mobile aplication with a single code base [@ionmic](https://ionicframework.com/)
- Ww are using Angular with @ionic/angular integration, Angular version 16 was used for this example
