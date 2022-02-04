# version of installed packages
ARG UBUNTU_VER=18.04
ARG CONDA_VER=latest
ARG OS_TYPE=x86_64

# Base OS
FROM ubuntu:${UBUNTU_VER}

# System packages
RUN apt-get update && apt-get install -yq curl wget jq vim

# Use the above args during building https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG CONDA_VER
ARG OS_TYPE
# Install miniconda to /miniconda
RUN curl -LO "http://repo.continuum.io/miniconda/Miniconda3-${CONDA_VER}-Linux-${OS_TYPE}.sh"
RUN bash Miniconda3-${CONDA_VER}-Linux-${OS_TYPE}.sh -p /miniconda -b
RUN rm Miniconda3-${CONDA_VER}-Linux-${OS_TYPE}.sh
ENV PATH=/miniconda/bin:${PATH}
RUN conda update -y conda


WORKDIR /data-processor

COPY environment.yml environment.yml

# RUN conda info -e
RUN conda env create -f environment.yml

RUN echo "source activate neodata" > ~/.bashrc

ENV PATH /opt/conda/envs/env/bin:$PATH

COPY . .

EXPOSE 8082

CMD ["/miniconda/envs/neodata/bin/python", "app.py"]



# RUN echo "source activate neo-conda" > ~/.bashrc

# ENV PATH /opt/conda/envs/env/bin:$PATH



#CMD ["gunicorn", "--workers=2", "--bind=0.0.0.0:5005", "app:app"]

# FROM continuumio/miniconda:latest

# WORKDIR /data-processor

# COPY environment.yml environment.yml
# RUN conda env create -f environment.yml

# # RUN echo "source activate env" > ~/.bashrc

# RUN conda activate neo-conda

# # ENV PATH /opt/conda/envs/env/bin:$PATH

# COPY . .

# EXPOSE 8082

# CMD ["python", "app.py"]


