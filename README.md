# GitHub pages for project Flow123d <img src="http://geomop.github.io/assets/favicon.ico" height="40" />
Project Flow123d website, available at [flow123d.github.io](http://flow123d.github.io/).

Running using [Jekyll](https://jekyllrb.com/) with js libraries [Angular.io](https://angular.io/)

## Running locally
First, clone the repository and then execute follwing:
```bash
bundle install
jekyll server --watch
```
or if your Gemfile requires different version than your jekyll use:
```bash
bundle install
bundle exec jekyll server --watch
```

### Notes on wesite structure

- To add a new release version, edit `javascript` file
  [`_data/releases.yml`](/assets/javascripts/releases.js)
  and add new folder in a [`releases`](/releases) directory containing
  required pages  in either `md` or `html` format. The required pages are:
    - readme.md
    - changes.md
    - features.md (or folder named features with more complex structure)
  

- To add a new picture/video to a gallery edit `yaml` file
  [`_data/gallery.yml`](/_data/gallery.yml)

- List of members is managed by `yaml` file
  [`_data/members.yml`](/_data/members.yml)


