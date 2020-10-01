import numpy as np
import random

python_seed = random.randint(1, 10000)
np.random.seed(python_seed)
dist = np.random.normal(loc=6.0, scale=1.0, size=10)

print(dist)