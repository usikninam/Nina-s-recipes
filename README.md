# 🌿 Jekyll Project Setup

This guide explains how to run the project locally before committing changes.

---

## ✅ 1. Check / Install Ruby

Check if Ruby is installed:

```bash
ruby -v
```

If Ruby is not installed:

```
brew install ruby
```

---

## ✅ 2. Install Bundler & Jekyll

```bash
gem install bundler jekyll
```

Bundler manages project dependencies.
Jekyll builds the static site.

---

## ✅ 3. Install Project Dependencies

From inside the project repository:

```bash
bundle install
```

This reads the Gemfile and installs the exact Ruby gems (packages) required for this project.

---

## ✅ 4. Run Locally

```bash
jekyll serve
```

Then open your browser:

```bash
http://localhost:4000
```

The site will automatically rebuild when you save changes.

---

## 💡 Recommended (for GitHub Pages projects)

Instead of:

```bash
jekyll serve
```

Use:

```bash
bundle exec jekyll serve
```

This ensures your local build uses the exact gem versions defined in the project (same as GitHub Pages).

---

### Happy building 🚀

---
