---
title: ReadMe
layout: page
---

# Flow123d

[![Jenkins release](http://ciflow.nti.tul.cz/status/release/Flow123d-ci2runner-release-multijob/3)](http://ciflow.nti.tul.cz:8080/view/multijob-list/job/Flow123d-ci2runner-release-multijob/) [![Jenkins debug](http://ciflow.nti.tul.cz/status/debug/Flow123d-ci2runner-debug-multijob/3)](http://ciflow.nti.tul.cz:8080/view/multijob-list/job/Flow123d-ci2runner-debug-multijob/) [![Coveralls master](https://img.shields.io/coveralls/github/flow123d/flow123d.svg?style=flat-square&label=coverage)](https://coveralls.io/github/flow123d/flow123d) [![Docker hub](https://img.shields.io/badge/docker-hub-blue.svg?colorA=2271b8&colorB=dc750d&logo=docker&style=flat-square&logoColor=FFF)](https://hub.docker.com/u/flow123d/) [![CI-HPC](https://img.shields.io/badge/ci--hpc-performace-darkgreen.svg?style=flat-square)](http://flowdb.nti.tul.cz/ci-hpc/)

*Transport Processes in Fractured Media*


Flow123d is a simulator of underground water flow and transport processes in fractured
porous media. Novelty of this software is support of computations on complex
meshes consisting of simplicial elements of different dimensions. Therefore
we can combine continuum models and discrete fracture network models.
For more information see the project pages:
[flow123d.github.com](http://flow123d.github.com).

## Getting started
Please refer to a **User Guide and Input Reference manual** available
at our [official website](http://flow123d.github.io/) where there is a entire section dedicated
to this topic. You can find step-by-step tutorial explaining geometries, `yaml` input files
and more. Below you can see a result from the tutorial problem.
![](doc/graphics/figure.png)


## Installation
You have several options when it comes to installation. You can use
our prebuilt Docker images or build Flow123d from the source (requires moderate to high experience with Linux OS).

For detailed instructions, see the [installation guide](doc/INSTALL.md).


## Developers
### Troubleshooting

  * When problem occurs during the compilation process it may be due to a leftover files in a build folder.
  Cleaning this directory can solve this issue. You can either remove `build-<branch>` folder
  (the folder is located one level above repository root) via
  `make clean-all`, which removes build folders and also remove any symlinks.  
  To clean all the build folders manually run <code>rm -rf ../build-*</code> while in a repository root.  
  **Running `rm -rf` can quite easily cause a lot of damage, double check that you're
  in a correct folder.**

  * During an installation under Windows, some scenarios can cause problems. Please refer to
  [an installation guide](https://docs.docker.com/toolbox/toolbox_install_windows/) for a
  Docker Toolbox. You can also check out
  [Troubleshooting page](https://docs.docker.com/toolbox/faqs/troubleshoot/) where the most
  common error are described and solved.


### Building the reference manual

The reference manual can be built by while in docker container
```sh
make ref-doc
```
To copy out reference manual from docker use command
[`docker cp`](https://docs.docker.com/engine/reference/commandline/cp/).
