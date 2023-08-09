import gulp from 'gulp';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import imageMin from 'gulp-imagemin';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { isBuild } from '../../gulpfile.js';
import filter from 'gulp-filter';

const copySvg = () => {
  return gulp.src(filePaths.src.svg).pipe(gulp.dest(filePaths.build.images));
};

const generateAvif = () => {
  return gulp
    .src(filePaths.src.images)
    .pipe(filter(['**/*.{jpg,jpeg,png}']))
    .pipe(gulpIf(isBuild, avif({ quality: 50 })))
    .pipe(
      rename((path) => {
        if (
          path.extname === '.jpg' ||
          path.extname === '.jpeg' ||
          path.extname === '.png'
        ) {
          path.extname = '.avif';
        }
      })
    )
    .pipe(gulp.dest(filePaths.build.images));
};

const generateWebp = () => {
  return gulp
    .src(filePaths.src.images)
    .pipe(gulpIf(['**/*.{jpg,jpeg,png}'], gulpIf(isBuild, webp())))
    .pipe(
      rename((path) => {
        if (
          path.extname === '.jpg' ||
          path.extname === '.jpeg' ||
          path.extname === '.png'
        ) {
          path.extname = '.webp';
        }
      })
    )
    .pipe(gulp.dest(filePaths.build.images));
};

const processImages = () => {
  return gulp
    .src(filePaths.src.images)
    .pipe(plugins.handleError('IMAGES'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(
      plugins.if(
        isBuild,
        imageMin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
    )
    .pipe(gulp.dest(filePaths.build.images));
};

// Define a series of tasks for each step
const imagesTask = gulp.series(
  copySvg,
  gulp.parallel(generateAvif, generateWebp, processImages)
);

export { imagesTask as images };
