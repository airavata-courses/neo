#docker buildx build . --platform linux/amd64,linux/arm64 -t neoairavataproject/data-service:2.3 --push
FROM conda/miniconda3


WORKDIR /data-processor

COPY environment.yml environment.yml

# RUN conda info -e
RUN conda env create -f environment.yml

RUN echo "source activate neodata" > ~/.bashrc

ENV PATH /opt/conda/envs/env/bin:$PATH

COPY . .

EXPOSE 8082

CMD ["/usr/local/envs/neodata/bin/python","-u" ,"app.py"]





