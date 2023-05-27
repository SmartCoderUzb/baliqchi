from django.core.paginator import Paginator
from django.shortcuts import render

from .models import Kategoriya, Post



def get_urls():
    return Kategoriya.objects.all()

def home(request):
    context = {

    }
    context['urls'] = get_urls()
    context['yangiliklar'] = Post.objects.filter(toplam="yangiliklar")
    context['meyoriyhujjatlar'] = Kategoriya.objects.all()[4]
    return render(request, "home.html",context)

def toplam(request):
    context = {

    }
    context['urls'] = get_urls()
    context['meyoriyhujjatlar'] = Kategoriya.objects.all()[5]
    code = request.GET.get('code')
    if not code:
        code = "yangiliklar"
    objects = Post.objects.filter(toplam=code).order_by('sana')
    paginator = Paginator(objects,5)
    context['page_obj'] = paginator.get_page(request.GET.get('page',1))
    return render(request,'toplam.html',context)


def postdetail(request,slug):
    context = {}
    context['urls'] = get_urls()
    context['bolimlar'] = Kategoriya.objects.all()[3]
    context['post'] = Post.objects.get(slug=slug)
    return render(request, 'post-detail.html',context)