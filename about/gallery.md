---
title: Gallery
layout: page
---


{% for gallery in site.data.gallery %}
  <div class="gallery">
  <h1>{{ gallery.section }}</h1>
  
    {% for item in gallery.items %}
      {% if item.link %}
        {% if item.thumb %}

  <a rel="gallery_group" class="mask waves-effect" title="{{ item.link }}" href="{{ item.link }}">
  <img alt="" src="{{ item.thumb }}">
  <figcaption markdown="1">{{ item.caption | safe }}</figcaption>
  </a>

        {% else %}

  <a rel="gallery_group" class="mask waves-effect" title="{{ item.link }}" href="{{ item.link }}">
  <img alt="" src="{{ item.link }}">
  <figcaption markdown="1">{{ item.caption | safe }}</figcaption>
  </a>
  
        {% endif %}

      {% else %}
      
  <a rel="gallery_group" class="mask waves-effect" title="{{ item.link }}" href="{{ item }}">
  <img alt="" src="{{ item }}">
  </a>
  
      {% endif %}
    {% endfor %}
  </div>
{% endfor %}