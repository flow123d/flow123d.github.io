---
title: Overview
layout: page
---

# Flow123d

Flow123d is a simulator of underground water flow, solute and heat transport
and mechanics in fractured porous media.
The core feature of this software is the consistent usage of reduced dimensional
concept across all the implemented partial differential equations.
Computational meshes can be quite complex and can consist of simplicial elements
of different dimensions (0D-1D-2D-3D).
Therefore, continuum models and discrete fracture network models can be combined.
The meshes are considered compatible between domains of different dimensions,
except for some parts of experimental features.


Current version supports following equations:
* steady and unsteady Darcy's flow
* Richard's equation for unsaturated flow
* advection-diffusion problems
    * solute transport of several substances (including first order reactions, sorption, dual porosity models)
    * heat transfer model
* mechanics including contact problems
* Biot's poroelasticity problem


Numerical methods currently implemented:
* mixed-hybrid finite element solver for flow problems
* finite volume model for convection-driven problems
* discontinuous Galerkin model for advection-diffusion and mechanical problems
* transport operator splitting for solute transport reaction term
* nonlinear iterative solvers for Richard's equation and poroelasticity problems


Computations can be run in parallel using MPI with scalability up to hundreds
of processors. The input interface based on YAML file format allows specification
of general space-time dependent data for any physical parameter.
Program supports output into GMSH and VTK formats.

The software uses external libraries:
[PETSc](https://petsc.org/),
[BDDCML](https://users.math.cas.cz/~sistek/software/bddcml.html),
[PERMON](http://permon.vsb.cz/),
[Armadillo](http://arma.sourceforge.net/),
[YamlCpp](https://yaml-cpp.docsforge.com/).

<video controls="" poster="/gallery/videos/test2d-poster.png">
    <source src="/gallery/videos/test2d.ogv" type="video/ogg">
    <source src="/gallery/videos/test2d.mp4" type="video/mp4">
    Your device does not support HTML5 video.
</video>