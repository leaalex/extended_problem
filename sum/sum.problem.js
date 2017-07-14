<problem>
<script type="loncapa/python">
import math
import json
import hashlib

taskId = hashlib.md5(str(random.randrange(100))).hexdigest()[:5]
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
</style>
<script type="text/javascript" src="https://openedu.urfu.ru/files/mengine/sum/sumScript.js"></script>

<div class="sum_task" id="id$taskId">
  <div class="svg_object">
  </div>

  <div class="inputs-list">
  
  </div>

<div class="JSONfield" id="answerInput_id$taskId">
  <customresponse cfn="check">
      <textline  size="40" label="JSONfield"/><br/>
  </customresponse>
</div>
  
</div>


</problem>