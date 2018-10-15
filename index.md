---
title: Overview
layout: page
---

# Flow123d

Flow123d is a simulator of underground water flow, solute and heat transport
in fractured porous media. Novelty of this software is support of computations
on complex meshes consisting of simplicial elements of different dimensions.
Therefore, we can combine continuum models and discrete fracture network models.

Current version includes mixed-hybrid solver for steady and unsteady Darcy flow,
finite volume model and discontinuous Galerkin model for solute transport of
several substances and heat transfer model. Using operator splitting, we support
models for various local processes including dual porosity, sorption, decays
and simple reactions.

Computations can be run in parallel using MPI with scalability up to hundreds
of processors. The input interface based on JSON file format allows specification
of general space-time dependent data for any physical parameter that does not
compromise performance. Program supports output into GMSH and VTK formats.

<video controls="" poster="https://flow123d.github.io/videos/test2d-poster.png">
    <source src="https://flow123d.github.io/videos/test2d.ogv" type="video/ogg">
    <source src="https://flow123d.github.io/videos/test2d.mp4" type="video/mp4">
    Your device does not support HTML5 video.
</video>