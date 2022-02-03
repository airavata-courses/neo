FROM continuumio/miniconda:latest
WORKDIR /data-processor

COPY environment.yml environment.yml

# RUN conda info -e
# RUN conda env create -f environment.yml
# RUN conda activate neo-conda

COPY . .

EXPOSE 8082

CMD ["python", "app.py"]



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


