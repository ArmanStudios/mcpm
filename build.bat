@echo off
echo Bundling TypeScript with esbuild...
call npx esbuild src/main.ts --bundle --platform=node --format=cjs --outfile=dist/build/bundled/main.js --loader:.ts=ts
@REM call npx esbuild src/main.js --bundle --platform=node --outfile=dist/build/bundled/main.js
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo Running SEA config...
node --experimental-sea-config sea-config.json
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo Cleaning old generated files...
if exist dist\build\generated rmdir /s /q dist\build\generated
mkdir dist\build\generated

echo Copying executable
node -e "require('fs').copyFileSync(process.execPath, './dist/build/generated/mcpm.exe')"
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo Injecting SEA blob into the executable...
call npx postject dist/build/generated/mcpm.exe NODE_SEA_BLOB dist/build/bundled/sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo Copying Assets folder
xcopy src\resources\assets dist\build\generated\assets /h/I/S/Q
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo Build completed successfully!
