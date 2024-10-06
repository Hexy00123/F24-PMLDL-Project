FROM kubeflownotebookswg/jupyter-scipy:v1.9.0

USER root

RUN apt-get update \
    && apt install -y unixodbc-dev \
    && apt-get install -y \
        python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install

RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash \
    && apt-get install git-lfs

#RUN wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb \
#    && dpkg -i cuda-keyring_1.1-1_all.deb \
#    && apt-get update \
#    && apt-get -y install cuda-toolkit-12-6
#
#ENV NVIDIA_VISIBLE_DEVICES=all
#ENV NVIDIA_DRIVER_CAPABILITIES=all

USER 1000

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt \
    && pip3 install jose \
    && pip install tensorflow \
    && pip install torch torchvision --index-url https://download.pytorch.org/whl/cu117 --no-cache-dir --force-reinstall \
    && pip install git+https://github.com/huggingface/diffusers.git \
    && pip install accelerate \
    && pip install datasets \
    && pip install bitsandbytes

#ENTRYPOINT /init
#CMD sleep 5 && nvidia-smi -mig 0
#CMD NVIDIA_VISIBLE_DEVICES=all
