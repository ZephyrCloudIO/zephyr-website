## Helper command

Convert a png file to webp [Source](https://stackoverflow.com/questions/68987106/how-to-make-ffmpeg-convert-a-png-sequence-into-a-webp-sequence-instead-of-makin):
```
ffmpeg -i in/%8d.png -c:v libwebp in/%8d.webp
# example
ffmpeg -i runtime-ota.png -c:v libwebp runtime-ota.webp
```

Convert a gif file to webp [Source](https://superuser.com/questions/1444932/convert-animated-gif-to-animated-webp-using-ffmpeg)

```sh
fmpeg -i in/%8d.gif -vcodec webp -loop 0 -pix_fmt yuva420p out/%8d.webp
```
