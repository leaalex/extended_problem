<problem>
<script type="loncapa/python">
import json
import hashlib

taskId = hashlib.md5(str(random.randrange(100))).hexdigest()[:5]
v = random.choice("a")

settings = {"a": [6, 2, 3]}
setting = settings[v]

points_count = setting[0]
xblocks_count = setting[1]
yblocks_count = setting[2]


def check(e, a=''):
    i = {"a": [0, 0, 0, 1, 0, 2]}
    e = {"a": [[[5, 4], [5, 5]],
               [[2, 4], [4, 5]],
               [[0, 4], [0, 5]],
               [[3, 0], [1, 1]],
               [[1, 0], [2, 1]],
               [[2, 0], [4, 1]],
               [[2, 2], [1, 3]],
               [[5, 0], [5, 1]],
               [[3, 2], [4, 3]],
               [[3, 4], [1, 5]],
               [[4, 4], [3, 5]],
               [[4, 0], [3, 1]],
               [[4, 2], [2, 3]],
               [[0, 0], [0, 1]],
               [[1, 2], [3, 3]],
               [[0, 2], [0, 3]],
               [[1, 4], [2, 5]],
               [[5, 2], [5, 3]]]
         }

    def _h(w):
        return hashlib.md5(str(w)).hexdigest()[:10]

    a = json.loads(a)
    try:
        inputs = a['inputs']
        for index, input in enumerate(inputs):
            if input == "":
                inputs[index] = 982437
            else:
                try:
                    inputs[index] = int(input.strip())
                except:
                    inputs[index] = 982437
        inputs_grade = len([ii for ii, ij in zip(i[v], inputs) if ii == ij]) / len(i[v])
    except:
        inputs_grade = 0

    a = dict((i, a[i]) for i in a if i != 'inputs')
    grade = round(
        1 - len(set(map(_h, [ar for ar in e[v]])) - set(map(_h, [ar for ar in a.itervalues()]))) / float(len(e[v])), 2)
    grade = (grade + inputs_grade) / 2

    if grade == 1:
        return {'input_list': [{'ok': True, 'grade_decimal': 1}]}
    elif 1 > grade > 0:
        return {'input_list': [{'ok': 'Partial', 'grade_decimal': grade}]}
    elif grade == 0:
        return {'input_list': [{'ok': False, 'grade_decimal': 0}]}

</script>
<style>
.start-point:hover, .end-point:hover{
  
}

svg text{
    cursor: default;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
.arrow-input{
  display: block;
    margin: 5px;
}
  
.inputs-list{
  margin: 20px;  
}
  
.input-container{
  width: 300px;
    margin: 0 auto;
    display: flex;
}
#task_input_formula{
  display: none;
  }
#task_input_formula .MathJax_SVG{
  top: 6px !important;
}
  
.input-container label{
  font-size: 1em;
  }
</style>
<script type="text/javascript" src="https://openedu.urfu.ru/files/mengine/sum/sumScript.js"></script>
  <H2>Постройте граф алгоритма БПФ с основанием N=$points_count</H2>
<div class="sum_task" id="id$taskId" points_count="$points_count" xblocks_count="$xblocks_count" yblocks_count="$yblocks_count">
  <div class="svg_object">
  </div>

  <div class="inputs-list">
    <h2> Множители поворота (\(W_{$points_count}^{-k}=e^{-j \frac{2 \pi}{$points_count} \cdot k}\))</h2>
   <!-- <div id="task_input_formula">\(k= \)</div> -->
  </div>

<div class="JSONfield" id="answerInput_id$taskId">
  <customresponse cfn="check">
      <textline  size="40" label="JSONfield"/><br/>
  </customresponse>
</div>
  
</div>


</problem>