# 🌿 Jekyll Project Setup

This guide explains how to run the project locally before committing changes.

This site uses the `github-pages` gem, which needs **Ruby 3.3** specifically (the same version GitHub Pages itself runs). A newer or older Ruby will cause `bundle install` to fail, so we use `rbenv` to install and pin that exact version.

---

## ✅ 1. Install rbenv (Ruby version manager)

Check if you already have it:

```bash
rbenv --version
```

If not installed:

```bash
brew install rbenv ruby-build
```

Then hook it into your shell (one-time setup):

```bash
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
```

Check it worked:

```bash
rbenv --version
```

You should see a version number, not a "command not found" error.

---

## ✅ 2. Install Ruby 3.3

```bash
rbenv install 3.3.6
```

Check it worked:

```bash
rbenv versions
```

You should see `3.3.6` in the list.

> If this step fails to compile, run `xcode-select --install` and `brew install openssl@3 readline libyaml gmp`, then try again.

---

## ✅ 3. Pin this project to Ruby 3.3

From inside the project repository:

```bash
rbenv local 3.3.6
```

This creates a `.ruby-version` file so this folder always uses Ruby 3.3, even if you have other Ruby versions installed for other projects.

Check it worked:

```bash
ruby -v
```

Should show `ruby 3.3.6...`, not any other version.

---

## ✅ 4. Install Bundler

```bash
gem install bundler
```

Bundler manages project dependencies.

---

## ✅ 5. Install Project Dependencies

From inside the project repository:

```bash
bundle install
```

This reads the `Gemfile` and installs the exact Ruby gems (packages) required for this project, including `github-pages` itself.

> If you're re-running this after a previous failed attempt, delete `Gemfile.lock` first (`rm Gemfile.lock`) so Bundler can recalculate cleanly.

---

## ✅ 6. Run Locally

```bash
bundle exec jekyll serve
```

We always use `bundle exec` (not just `jekyll serve`) so the site runs with the exact gem versions defined in the project — the same ones GitHub Pages uses.

Then open your browser:

```
http://localhost:4000
```

The site will automatically rebuild when you save changes.

---

### Happy building 🚀