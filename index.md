---
layout: default
title: Recipes
---

# Recipes

A collection of recipes.

---

## All Recipes

<ul>
{% for page in site.pages %}
  {% if page.path contains ".md"
        and page.name != "index.md"
        and page.name != "README.md" %}
    <li>
      <a href="{{ page.url | prepend: site.baseurl }}">
        {{ page.name | replace: ".md","" }}
      </a>
    </li>
  {% endif %}
{% endfor %}
</ul>
