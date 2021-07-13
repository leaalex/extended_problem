# -*- coding: utf-8 -*-
import random
import math
# import matplotlib.pyplot as plt
import numpy as np


def fit_slope_and_intercept(_xs, _ys):
    #  средняя линия
    _xs = np.array(_xs, dtype=np.float64)
    _ys = np.array(_ys, dtype=np.float64)
    _m = (((np.mean(_xs) * np.mean(_ys)) - np.mean(_xs * _ys)) / ((np.mean(_xs) * np.mean(_xs)) - np.mean(_xs * _xs)))
    _b = np.mean(_ys) - _m * np.mean(_xs)
    return _m, _b


def line_equation(_x, _y, _x1, _y1, calc_val):
    a = (_y1-_y)/(_x1-_x)
    b = _y-_x*a
    return round(a * calc_val + b, 4)


def get_difference():
    return round(random.choice([-1, 1]) * random.randint(20, 50) * 0.0001, 4)


def gen_base_values():
    x1 = -round(random.randint(50, 155) * 0.01, 2)
    x2, x3, x4 = 0, 1, 2
    y4 = round(random.randint(550, 700) * 0.001, 3)
    y1 = 0
    y2 = line_equation(x1, y1, x4, y4, x2)
    y3 = line_equation(x1, y1, x4, y4, x3)

    return y2, y3, y4

# A1 = 0.0829
# A2 = 0.0863
# A3 = 0.0798
# A4 = 0.2639
# A5 = 0.2642
# A6 = 0.2641
# A7 = 0.4079
# A8 = 0.4093
# A9 = 0.4085

# A10 = 0.0833
# A11 = 0.0820
# A12 = 0.0818
# A13 = 0.1786
# A14 = 0.1781
# A15 = 0.1772
# A16 = 0.2670
# A17 = 0.2656
# A18 = 0.2659

A1, A4, A7 = gen_base_values()
A2 = A1 + get_difference()
A5 = A4 + get_difference()
A8 = A7 + get_difference()
A3 = A1 + get_difference()
A6 = A4 + get_difference()
A9 = A7 + get_difference()

A10, A13, A16 = gen_base_values()
A11 = A10 + get_difference()
A14 = A13 + get_difference()
A17 = A16 + get_difference()
A12 = A10 + get_difference()
A15 = A13 + get_difference()
A18 = A16 + get_difference()

Cu_1_avg = round(sum([A1, A2, A3])/3, 4)
Cu_2_avg = round(sum([A4, A5, A6])/3,4)
Cu_3_avg = round(sum([A7, A8, A9])/3, 4)

Fe_1_avg = round(sum([A10, A11, A12])/3, 4)
Fe_2_avg = round(sum([A13, A14, A15])/3,4)
Fe_3_avg = round(sum([A16, A17, A18])/3, 4)

Cu_avgs = [Cu_1_avg, Cu_2_avg, Cu_3_avg]
Fe_avgs = [Fe_1_avg, Fe_2_avg, Fe_3_avg]

Cu_k, Cu_b = fit_slope_and_intercept([0, 1, 2], Cu_avgs)
C_Cu = round(abs((-Cu_b)/Cu_k), 2)
m_Cu = round((C_Cu*math.pow(10, -6)*25*50/10) * math.pow(10, 5), 4)

Fe_k, Fe_b = fit_slope_and_intercept([0, 1, 2], Fe_avgs)
C_Fe = round(abs((-Fe_b)/Fe_k), 2)
m_Fe = round((C_Fe*math.pow(10, -6)*25*50/10) * math.pow(10, 5), 4)

# plt.plot([0, 1, 2], [A1, A4, A7], 'k' "o-")
# plt.plot([0, 1, 2], [A2, A5, A8], 'y' "o-")
# plt.plot([0, 1, 2], [A3, A6, A9], 'r' "o-")
# plt.plot([-C_Cu, 0, 1, 2], [0] + Cu_avgs, 'b' 'o-')

# plt.plot([ 0, 1, 2], [A1, A4, A7], 'b' 'o-')

# plt.plot([0, 1, 2], [A10, A13, A16], 'k' "o-")
# plt.plot([0, 1, 2], [A11, A14, A17], 'y' "o-")
# plt.plot([0, 1, 2], [A12, A15, A18], 'r' "o-")
# plt.plot([-C_Fe, 0, 1, 2], [0] + Fe_avgs, 'k' 'o-')

# plt.ylim([-0.1, 0.7])
# plt.xlim([-1.6, 2])
#
# plt.show()
